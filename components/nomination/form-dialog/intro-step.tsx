'use client'

import type { NominationFormState } from '@/app/nominations/actions'
import {
  errorId,
  fieldError,
} from '@/components/nomination/form-dialog/field-errors'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { categoryGroups, nominationTargets } from '@/lib/nomination-form-data'
import { useNominationDialogStore } from '@/lib/stores/nomination-dialog-store'
import { cn } from '@/lib/utils'

export function IntroStep({ state }: { state: NominationFormState }) {
  const category = useNominationDialogStore((store) => store.category)
  const nominatingFor = useNominationDialogStore((store) => store.nominatingFor)
  const setField = useNominationDialogStore((store) => store.setField)
  const nextStep = useNominationDialogStore((store) => store.nextStep)
  const categoryError = fieldError(state, 'category')
  const targetError = fieldError(state, 'nominatingFor')

  return (
    <div className='flex flex-col justify-center gap-8'>
      <div className=''>
        <DialogTitle className='text-2xl font-semibold text-champagne-gold'>
          Nomination Form
        </DialogTitle>
        <DialogDescription className='font-medium text-primary'>
          Complete the form below to submit a nominee for the PAWEN Awards
        </DialogDescription>
      </div>

      <div className='flex flex-col gap-2'>
        <label
          className='text-sm font-semibold text-primary'
          htmlFor='category-dialog-select'
        >
          Which category are you nominating for? *
        </label>
        <Select
          name='category'
          value={category || null}
          onValueChange={(value) => setField('category', value ?? '')}
        >
          <SelectTrigger
            aria-describedby={categoryError ? errorId('category') : undefined}
            aria-invalid={categoryError ? 'true' : 'false'}
            className={cn(
              'h-12 w-full rounded-full border border-background bg-white px-6 text-base text-background focus-visible:ring-background/25 [&_svg]:text-background',
              categoryError ? 'ring-3 ring-destructive/40' : '',
            )}
            id='category-dialog-select'
          >
            <SelectValue
              className={category ? 'text-background' : 'text-gray-400'}
              placeholder='Select Category'
            />
          </SelectTrigger>
          <SelectContent className='scrollbar-hide bg-white text-background'>
            {categoryGroups.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel className='text-background/60'>
                  {group.label}
                </SelectLabel>
                {group.options.map((option) => (
                  <SelectItem
                    className='text-background focus:bg-champagne-gold focus:text-background'
                    key={option}
                    value={option}
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
        {categoryError ? (
          <span className='text-xs text-destructive' id={errorId('category')}>
            {categoryError}
          </span>
        ) : null}
      </div>

      <fieldset
        aria-describedby={targetError ? errorId('nominatingFor') : undefined}
        className='flex flex-col gap-4 space-y-3'
      >
        <legend className='text-base font-semibold text-primary sm:text-xl'>
          Are you nominating yourself or someone else? *
        </legend>
        <div className='flex flex-col gap-4 sm:flex-row sm:flex-wrap'>
          {nominationTargets.map((target) => (
            <label
              className='flex items-center gap-3 text-base text-primary'
              htmlFor={`target-${target}`}
              key={target}
            >
              <Checkbox
                aria-invalid={targetError ? 'true' : 'false'}
                checked={nominatingFor === target}
                className='size-5 border border-primary bg-white data-checked:bg-champagne-gold data-checked:text-background'
                id={`target-${target}`}
                onCheckedChange={(checked) =>
                  setField('nominatingFor', checked ? target : '')
                }
              />
              <span>{target}</span>
            </label>
          ))}
        </div>
        <input name='nominatingFor' type='hidden' value={nominatingFor} />
        {targetError ? (
          <span
            className='text-xs text-destructive'
            id={errorId('nominatingFor')}
          >
            {targetError}
          </span>
        ) : null}
      </fieldset>

      <div className='flex justify-end'>
        <Button
          className='h-12 w-full rounded-full bg-champagne-gold px-10 text-background hover:!scale-100 hover:bg-champagne-gold/90 active:!translate-y-0 active:!scale-100 sm:w-36'
          onClick={nextStep}
          type='button'
        >
          Next
        </Button>
      </div>
    </div>
  )
}
