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
    Entry?: ContentfulEntry<Record<string, unknown>>[]
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
  speakerCategory?: unknown
  visible?: boolean
  year?: string | number | ContentfulLink
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
  year: string
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

  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${config.spaceId}/environments/${config.environment}/entries?${searchParams}`,
      { cache: 'no-store' },
    )

    if (!response.ok) {
      return null
    }

    return (await response.json()) as ContentfulCollection<TFields>
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      (('digest' in error && error.digest === 'DYNAMIC_SERVER_USAGE') ||
        ('message' in error &&
          typeof error.message === 'string' &&
          error.message.includes('Dynamic server usage')))
    ) {
      throw error
    }
    console.error(`Error fetching Contentful entries for ${contentType}:`, error)
    return null
  }
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

function entryMap<TFields>(collection?: ContentfulCollection<TFields> | null) {
  return new Map(
    collection?.includes?.Entry?.map((entry) => [entry.sys.id, entry]) ?? [],
  )
}

function resolveSpeakerYear(
  yearField: string | number | ContentfulLink | undefined,
  entries: Map<string, ContentfulEntry<Record<string, unknown>>>,
): string {
  if (yearField === undefined || yearField === null) {
    return ''
  }

  if (typeof yearField === 'string') {
    return yearField.trim()
  }

  if (typeof yearField === 'number') {
    return String(yearField)
  }

  if (typeof yearField === 'object' && 'sys' in yearField) {
    const linked = entries.get(yearField.sys.id)
    const val =
      linked?.fields?.year ??
      linked?.fields?.heading ??
      linked?.fields?.title ??
      linked?.fields?.name
    if (val !== undefined && val !== null) {
      return String(val).trim()
    }
    return yearField.sys.id
  }

  return ''
}

function resolveSpeakerCategory(
  categoryField: unknown,
  entries: Map<string, ContentfulEntry<Record<string, unknown>>>,
): string {
  if (!categoryField) {
    return 'Keynote'
  }

  if (typeof categoryField === 'string') {
    const trimmed = categoryField.trim()
    return trimmed || 'Keynote'
  }

  if (Array.isArray(categoryField)) {
    const first = categoryField[0]
    return resolveSpeakerCategory(first, entries)
  }

  if (typeof categoryField === 'object' && categoryField !== null) {
    if ('sys' in categoryField && (categoryField as ContentfulLink).sys?.id) {
      const linked = entries.get((categoryField as ContentfulLink).sys.id)
      const val =
        linked?.fields?.name ??
        linked?.fields?.title ??
        linked?.fields?.category ??
        linked?.fields?.label ??
        linked?.fields?.slug
      if (val && typeof val === 'string') {
        return val.trim()
      }
    }

    const rec = categoryField as Record<string, unknown>
    if (rec.fields && typeof rec.fields === 'object') {
      const f = rec.fields as Record<string, unknown>
      const val = f.name ?? f.title ?? f.category ?? f.label ?? f.slug
      if (val && typeof val === 'string') {
        return val.trim()
      }
    }

    if (typeof rec.name === 'string' && rec.name.trim()) return rec.name.trim()
    if (typeof rec.title === 'string' && rec.title.trim()) return rec.title.trim()
    if (typeof rec.category === 'string' && rec.category.trim()) return rec.category.trim()
    if (typeof rec.label === 'string' && rec.label.trim()) return rec.label.trim()
  }

  return 'Keynote'
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
  const entries = entryMap(collection)

  return (
    collection?.items.map(({ fields, sys }) => {
      const category = resolveSpeakerCategory(fields.speakerCategory, entries)
      const eventRoleLabel =
        typeof fields.eventRoleLabel === 'string' && fields.eventRoleLabel.trim()
          ? fields.eventRoleLabel.trim()
          : category

      return {
        bio: fields.bio ?? '',
        category,
        eventRoleLabel,
        image: resolveImage(fields.image, assets),
        linkedinUrl: fields.linkedinUrl ?? fields.linkedInUrl ?? '',
        name: fields.name ?? 'Speaker',
        professionalTitle: fields.professionalTitle ?? '',
        slug: fields.slug ?? sys.id,
        year: resolveSpeakerYear(fields.year, entries) || '2026',
      }
    }) ?? []
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
