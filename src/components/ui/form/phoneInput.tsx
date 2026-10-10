'use client';

import { countries } from '@/constants/country';
import Image from 'next/image';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { Input } from '../input';
import { Select, SelectContent, SelectTrigger, SelectValue } from '../select';

interface Country {
  code: string;
  label: string;
  phone: string;
  icon: string;
  regex: string;
}

interface PhoneInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  textColor?: string;
  labelBgColor?: string;
  labelTextColor?: string;
  borderColor?: string;
  focusBorderColor?: string;
  errorColor?: string;
  triggerBgColor?: string;
}

const CountryFlag = memo(function CountryFlag({ icon, label }: { icon: string; label: string }) {
  return (
    <Image
      src={`/icons/flagpack/${icon}`}
      alt={label}
      width={22}
      height={15}
      className="rounded-sm h-auto w-auto"
      priority
    />
  );
});

function PhoneInput<TFieldValues extends FieldValues>({
  name,
  control,
  label = 'Phone number',
  required = false,
  className = '',
  textColor = 'text-black',
  labelBgColor = 'bg-white',
  labelTextColor = 'text-black',
  borderColor = '!border-gray-300',
  triggerBgColor = 'bg-transparent',
}: PhoneInputProps<TFieldValues>) {
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'IN',
    label: 'India',
    phone: '91',
    icon: 'in.webp',
    regex: '^\\d{10}$',
  });
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    field: { onChange, ref, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? 'Please enter a phone number' : false,
      validate: (fieldValue: unknown) => {
        const val = String(fieldValue || '').trim();
        if (!val && !required) return true;
        if (!val && required) return 'Please enter a phone number';
        const phoneOnly = val.split('-')[1]?.replace(/\D/g, '');
        if (!phoneOnly) return 'Please enter a phone number';
        const regex = new RegExp(selectedCountry.regex);
        return regex.test(phoneOnly) || `Invalid ${selectedCountry.label} number`;
      },
    },
  });

  useEffect(() => {
    if (!value) {
      // RHF ne clear kiya hai
      setPhoneNumber('');
      setSelectedCountry({
        code: 'IN',
        label: 'India',
        phone: '91',
        icon: 'in.webp',
        regex: '^\\d{10}$',
      });
    } else {
      // value format: +91-9876543210
      const [code, num] = String(value).split('-');
      if (code && num) {
        setPhoneNumber(num.replace(/\D/g, ''));
      }
    }
  }, [value]);

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries;
    return countries.filter(
      (c) =>
        c.label.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm)
    );
  }, [searchTerm]);

  const visibleCountries = useMemo(
    () => filteredCountries.slice(0, visibleCount),
    [filteredCountries, visibleCount]
  );

  const getMaxLength = (regex: string) => {
    const match = regex.match(/\{(\d+),?(\d+)?\}/);
    if (match) return parseInt(match[2] || match[1]);
    return 15;
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
      setVisibleCount(12);
    }
  }, [isOpen]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prefix = `+${selectedCountry.phone} `;
    let numbers = e.target.value.startsWith(prefix)
      ? e.target.value.substring(prefix.length).replace(/\D/g, '')
      : e.target.value.replace(/\D/g, '');

    const max = getMaxLength(selectedCountry.regex);
    numbers = numbers.slice(0, max);
    setPhoneNumber(numbers);
    onChange(numbers ? `+${selectedCountry.phone}-${numbers}` : '');
  };

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    const max = getMaxLength(country.regex);
    const newPhone = phoneNumber.slice(0, max);
    setPhoneNumber(newPhone);
    onChange(newPhone ? `+${country.phone}-${newPhone}` : '');
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <div className="relative">
        <div className="flex">
          <Select open={isOpen} onOpenChange={setIsOpen} value={selectedCountry.code}>
            <SelectTrigger
              className={`w-[80px] h-[46px] shadow-none rounded-r-none  border-r border-[#d1d5dc]${triggerBgColor} ${
                error ? 'border-red-500' : borderColor
              }`}
            >
              <SelectValue>
                <CountryFlag icon={selectedCountry.icon} label={selectedCountry.label} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              className="z-[100] p-0 max-h-[300px] w-[280px] bg-gray-100"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <div className="p-2 sticky top-0 bg-white z-20 border-b">
                <Input
                  ref={searchInputRef}
                  placeholder="Search country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="h-9"
                />
              </div>
              <div
                className="overflow-y-auto max-h-[240px]"
                onScroll={(e) => {
                  const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                  if (scrollHeight - scrollTop <= clientHeight + 30) {
                    setVisibleCount((prev) => prev + 15);
                  }
                }}
              >
                {visibleCountries.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => selectCountry(c)}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100  transition-colors"
                  >
                    <CountryFlag icon={c.icon} label={c.label} />
                    <span className="text-sm flex-1 truncate text-gray-900">{c.label}</span>
                    <span className="text-xs text-gray-900">+{c.phone}</span>
                  </div>
                ))}
              </div>
            </SelectContent>
          </Select>

          <input
            type="tel"
            value={
              phoneNumber
                ? `+${selectedCountry.phone} ${phoneNumber}`
                : `+${selectedCountry.phone} `
            }
            onChange={handlePhoneChange}
            onKeyDown={(e) => {
              const prefixLen = `+${selectedCountry.phone} `.length;
              if (e.key === 'Backspace' && (e.currentTarget.selectionStart || 0) <= prefixLen) {
                e.preventDefault();
              }
            }}
            ref={ref}
            className={`block px-3 pb-2.5 pt-3 w-full text-sm bg-transparent rounded-r border border-l-0 ${textColor} focus:outline-none focus:ring-0 ${
              error ? 'border-red-500 focus:border-red-500' : borderColor
            }`}
            placeholder=" "
          />

          <label
            className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] ${labelBgColor} px-2 transition-all
              ${error ? 'text-red-400' : labelTextColor}
              peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
              peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
              left-[90px] ml-[-80px]
            `}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400 font-medium">{error.message}</p>}
    </div>
  );
}

export default PhoneInput;
