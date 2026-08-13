type ContentfulSys = {
  id: string
  contentType?: {
    sys: {
      id: string
    }
  }
}

type ContentfulLink = {
  sys: {
    id: string
    linkType: string
    type: string
  }
}

type ContentfulAsset = {
  fields?: {
    description?: string
    file?: {
      url?: string
    }
    title?: string
  }
  sys: {
    id: string
  }
}

type ContentfulEntry<TFields> = {
  fields: TFields
  sys: ContentfulSys
}

type ContentfulCollection<TFields> = {
  includes?: {
    Asset?: ContentfulAsset[]
  }
  items: ContentfulEntry<TFields>[]
}

type SpeakerPageFields = {
  ctaLabel?: string
  ctaUrl?: string
  heading?: string
  intro?: string
  seoDescription?: string
  seoTitle?: string
}

type SpeakerFields = {
  bio?: string
  eventRoleLabel?: string
  image?: ContentfulLink
  linkedInUrl?: string
  linkedinUrl?: string
  name?: string
  professionalTitle?: string
  slug?: string
  sortOrder?: number
  speakerCategory?: string
  visible?: boolean
}

type WinnerYearFields = {
  heading?: string
  intro?: string
  sortOrder?: number
  visible?: boolean
  year?: string
}

type AwardCategoryFields = {
  name?: string
  slug?: string
  sortOrder?: number
  visible?: boolean
}

type AwardWinnerFields = {
  awardCategory?: ContentfulLink
  image?: ContentfulLink
  linkedInUrl?: string
  linkedinUrl?: string
  name?: string
  slug?: string
  sortOrder?: number
  visible?: boolean
  winnerTitle?: string
  year?: ContentfulLink
}

export type ContentImage = {
  alt: string
  url: string
}

export type SpeakerPageContent = {
  ctaLabel: string
  ctaUrl: string
  heading: string
  intro: string
  seoDescription?: string
  seoTitle?: string
}

export type Speaker = {
  bio: string
  category: string
  eventRoleLabel: string
  image: ContentImage | null
  linkedinUrl: string
  name: string
  professionalTitle: string
  slug: string
}

export type WinnerYear = {
  heading: string
  id: string
  intro: string
  year: string
}

export type AwardCategory = {
  id: string
  name: string
  slug: string
}

export type AwardWinner = {
  categoryId: string
  image: ContentImage | null
  linkedinUrl: string
  name: string
  slug: string
  winnerTitle: string
  yearId: string
}

const DEFAULT_SPEAKER_PAGE: SpeakerPageContent = {
  ctaLabel: 'Register to Attend Summit',
  ctaUrl: '/summit',
  heading: 'Our Speakers',
  intro:
    "Inspiring, visionary, and bold, our speakers and moderators represent Africa's most dynamic women and allies driving innovation, leadership, and inclusion.",
}

function getContentfulConfig() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
  const environment = process.env.CONTENTFUL_ENVIRONMENT ?? 'master'

  if (!spaceId || !accessToken) {
    return null
  }

  return { accessToken, environment, spaceId }
}

async function fetchContentfulEntries<TFields>(
  contentType: string,
  params?: Record<string, string>,
) {
  const config = getContentfulConfig()

  if (!config) {
    return null
  }

  const searchParams = new URLSearchParams({
    access_token: config.accessToken,
    content_type: contentType,
    include: '2',
    ...params,
  })

  const response = await fetch(
    `https://cdn.contentful.com/spaces/${config.spaceId}/environments/${config.environment}/entries?${searchParams}`,
    { cache: 'no-store' },
  )

  if (!response.ok) {
    return null
  }

  return (await response.json()) as ContentfulCollection<TFields>
}

function assetMap<TFields>(collection?: ContentfulCollection<TFields> | null) {
  return new Map(
    collection?.includes?.Asset?.map((asset) => [asset.sys.id, asset]) ?? [],
  )
}

function normalizeAssetUrl(url?: string) {
  if (!url) {
    return ''
  }

  return url.startsWith('//') ? `https:${url}` : url
}

function resolveImage(
  link: ContentfulLink | undefined,
  assets: Map<string, ContentfulAsset>,
) {
  if (!link) {
    return null
  }

  const asset = assets.get(link.sys.id)
  const url = normalizeAssetUrl(asset?.fields?.file?.url)

  if (!url) {
    return null
  }

  return {
    alt: asset?.fields?.description || asset?.fields?.title || '',
    url,
  }
}

export async function getSpeakerPageContent() {
  const collection = await fetchContentfulEntries<SpeakerPageFields>(
    'speakersPage',
    { limit: '1' },
  )
  const fields = collection?.items[0]?.fields

  return {
    ctaLabel: fields?.ctaLabel || DEFAULT_SPEAKER_PAGE.ctaLabel,
    ctaUrl: fields?.ctaUrl || DEFAULT_SPEAKER_PAGE.ctaUrl,
    heading: fields?.heading || DEFAULT_SPEAKER_PAGE.heading,
    intro: fields?.intro || DEFAULT_SPEAKER_PAGE.intro,
    seoDescription: fields?.seoDescription,
    seoTitle: fields?.seoTitle,
  }
}

export async function getSpeakers() {
  const collection = await fetchContentfulEntries<SpeakerFields>('speakers', {
    'fields.visible': 'true',
    order: 'fields.sortOrder',
  })
  const assets = assetMap(collection)

  return (
    collection?.items.map(({ fields, sys }) => ({
      bio: fields.bio ?? '',
      category: fields.speakerCategory ?? 'Keynote',
      eventRoleLabel: fields.eventRoleLabel ?? fields.speakerCategory ?? '',
      image: resolveImage(fields.image, assets),
      linkedinUrl: fields.linkedinUrl ?? fields.linkedInUrl ?? '',
      name: fields.name ?? 'Speaker',
      professionalTitle: fields.professionalTitle ?? '',
      slug: fields.slug ?? sys.id,
    })) ?? []
  )
}

export async function hasVisibleSpeakers() {
  const collection = await fetchContentfulEntries<SpeakerFields>('speakers', {
    'fields.visible': 'true',
    include: '0',
    limit: '1',
    select: 'sys.id',
  })

  return (collection?.items.length ?? 0) > 0
}

export async function getWinnerYears() {
  const collection = await fetchContentfulEntries<WinnerYearFields>(
    'winnerYear',
    { 'fields.visible': 'true', order: 'fields.sortOrder' },
  )

  return (
    collection?.items.map(({ fields, sys }) => ({
      heading: fields.heading ?? `${fields.year ?? ''} Award Winners`,
      id: sys.id,
      intro: fields.intro ?? '',
      year: fields.year ?? '',
    })) ?? []
  )
}

export async function hasVisibleAwardWinners() {
  const collection = await fetchContentfulEntries<AwardWinnerFields>(
    'awardWinner',
    {
      'fields.visible': 'true',
      include: '0',
      limit: '1',
      select: 'sys.id',
    },
  )

  return (collection?.items.length ?? 0) > 0
}

export async function getAwardCategories() {
  const collection = await fetchContentfulEntries<AwardCategoryFields>(
    'awardCategory',
    { 'fields.visible': 'true', order: 'fields.sortOrder' },
  )

  return (
    collection?.items.map(({ fields, sys }) => ({
      id: sys.id,
      name: fields.name ?? 'Award Category',
      slug: fields.slug ?? sys.id,
    })) ?? []
  )
}

export async function getAwardWinners() {
  const collection = await fetchContentfulEntries<AwardWinnerFields>(
    'awardWinner',
    { 'fields.visible': 'true', order: 'fields.sortOrder' },
  )
  const assets = assetMap(collection)

  return (
    collection?.items.map(({ fields, sys }) => ({
      categoryId: fields.awardCategory?.sys.id ?? '',
      image: resolveImage(fields.image, assets),
      linkedinUrl: fields.linkedinUrl ?? fields.linkedInUrl ?? '',
      name: fields.name ?? 'Award Winner',
      slug: fields.slug ?? sys.id,
      winnerTitle: fields.winnerTitle ?? '',
      yearId: fields.year?.sys.id ?? '',
    })) ?? []
  )
}
