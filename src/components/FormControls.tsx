import React from 'react';

const ic = 'w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]/40 focus:border-[#003366] bg-white text-[#003366] transition-colors text-sm'

export function FI({ label, value, onChange, required, type = 'text', placeholder, hint, min, max, step }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string; hint?: string; min?: string; max?: string; step?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-[#003366] mb-2">{label}</label>
      <input type={type} min={min} max={max} step={step} value={value} onChange={e => onChange(e.target.value)} className={ic} placeholder={placeholder} />
      {hint && <p className="text-xs text-[#5a7a9a] mt-1">{hint}</p>}
    </div>
  )
}

export function FS({ label, value, onChange, options, placeholder, hint }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string; hint?: string
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-[#003366] mb-2">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className={ic}>
        <option value="">{placeholder || '---'}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <p className="text-xs text-[#5a7a9a] mt-1 flex items-center gap-1">
        <span className="text-[#cc0000]">ⓘ</span> {hint}
      </p>}
    </div>
  )
}

export function FR({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-[#003366] mb-2">{label}</label>
      <div className="space-y-2">
        {options.map(o => (
          <label key={o.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio" name={label} value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="w-4 h-4 text-[#003366] border-[#a8c8e8] focus:ring-[#003366]"
            />
            <span className="text-sm text-[#003366]">{o.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export function FC({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 py-1.5 cursor-pointer group">
      <input
        type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-[#a8c8e8] text-[#003366] focus:ring-[#003366]"
      />
      <span className="text-sm text-[#003366] group-hover:text-[#001a33]">{label}</span>
    </label>
  )
}

export function FTA({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-[#003366] mb-2">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className={ic} placeholder={placeholder} />
    </div>
  )
}

export function SH({ children }: { children: string }) {
  return <h3 className="text-base font-bold text-[#003366] mb-4 mt-6">{children}</h3>
}

export interface FormStepProps {
  step: number;
  d: any;
  set: (k: string, v: any) => void;
  tl: (k: string) => string;
  v: (k: string) => any;
  arrHas: (key: string, val: string) => boolean;
  toggleArr: (key: string, val: string) => void;
  ImageUpload: () => JSX.Element;
}

export const getFloorOptions = (t: any) => [
  { value: 'ground', label: t('wizard.common.floorOptions.ground') },
  { value: '1', label: t('wizard.common.floorOptions.1') },
  { value: '2', label: t('wizard.common.floorOptions.2') },
  { value: '3', label: t('wizard.common.floorOptions.3') },
  { value: '4', label: t('wizard.common.floorOptions.4') },
  { value: '5', label: t('wizard.common.floorOptions.5') },
  { value: '6+', label: t('wizard.common.floorOptions.6plus') }
]

export const roomNumbers = [
  { value: '1', label: '1' }, { value: '1.5', label: '1.5' }, { value: '2', label: '2' },
  { value: '2.5', label: '2.5' }, { value: '3', label: '3' }, { value: '3.5', label: '3.5' },
  { value: '4', label: '4' }, { value: '4.5', label: '4.5' }, { value: '5', label: '5' },
  { value: '5.5', label: '5.5' }, { value: '6', label: '6' }, { value: '6.5', label: '6.5' },
  { value: '7', label: '7' }, { value: '7+', label: '7+' }
]

export const livingSpaceOptions = [
  { value: '<40', label: '< 40 m²' }, { value: '40-60', label: '40 - 60 m²' },
  { value: '60-80', label: '60 - 80 m²' }, { value: '80-100', label: '80 - 100 m²' },
  { value: '100-120', label: '100 - 120 m²' }, { value: '120-150', label: '120 - 150 m²' },
  { value: '150-200', label: '150 - 200 m²' }, { value: '>200', label: '> 200 m²' }
]

export const peopleOptions = [
  { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' },
  { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6+', label: '6+' }
]

export const boxOptions = [
  { value: '0-10', label: '0 - 10' }, { value: '10-20', label: '10 - 20' },
  { value: '20-30', label: '20 - 30' }, { value: '30-40', label: '30 - 40' },
  { value: '40-50', label: '40 - 50' }, { value: '50+', label: '50+' }
]
