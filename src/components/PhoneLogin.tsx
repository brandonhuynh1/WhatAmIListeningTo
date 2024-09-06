import React, { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from 'libphonenumber-js';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js/max';
import Spinner from '@/components/Spinner';  // Update this line

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('phone');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    let formattedInput = '';
    
    // Only format if we have input
    if (input.length > 0) {
      formattedInput += '(' + input.substr(0, 3);
      if (input.length > 3) {
        formattedInput += ') ' + input.substr(3, 3);
      }
      if (input.length > 6) {
        formattedInput += '-' + input.substr(6, 4);
      }
    }

    // If the new formatted input is shorter than the current value, allow deletion
    if (formattedInput.length <= phoneNumber.length) {
      setPhoneNumber(formattedInput);
    } else {
      setPhoneNumber(phoneNumber + formattedInput.slice(phoneNumber.length));
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryCode = e.target.value as CountryCode;
    setCountryCode(newCountryCode);
    setPhoneNumber(''); // Reset phone number when country changes
  };

  const isValidPhone = useMemo(() => {
    return phoneNumber && isValidPhoneNumber(phoneNumber, countryCode);
  }, [phoneNumber, countryCode]);

  // Create a memoized array of unique country codes
  const uniqueCountries = useMemo(() => {
    const countryMap = new Map<string, CountryCode>();
    getCountries().forEach(country => {
      const callingCode = getCountryCallingCode(country);
      countryMap.set(callingCode, country as CountryCode);
    });
    return Array.from(countryMap.entries())
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  }, []);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPhone) return;
    setIsLoading(true);
    try {
      const parsedNumber = parsePhoneNumber(phoneNumber, countryCode);
      const response = await fetch('/api/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: parsedNumber.number }),
      });
      if (response.ok) {
        setStep('verify');
      } else {
        console.error('Failed to send verification code');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const parsedNumber = parsePhoneNumber(phoneNumber, countryCode);
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: parsedNumber.number, verificationCode }),
      });
      if (response.ok) {
        const data = await response.json();
        router.push(`/connect-spotify?phoneNumber=${encodeURIComponent(parsedNumber.number)}`);
      } else {
        const errorData = await response.json();
        console.error('Failed to verify code:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      {step === 'phone' ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-6">
          <div className="flex space-x-2">
            <select
              value={countryCode}
              onChange={handleCountryChange}
              className="w-32 p-4 pr-8 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 transition duration-300 appearance-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
            >
              {uniqueCountries.map(([callingCode, country]) => (
                <option key={country} value={country}>
                  +{callingCode}
                </option>
              ))}
            </select>
            <input
              ref={inputRef}
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="(123) 456-7890"
              maxLength={14} // This allows for long international numbers with formatting
              className={`flex-1 p-4 bg-gray-700 border ${
                isValidPhone ? 'border-green-500' : 'border-gray-600'
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition duration-300`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-green-500 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300 ${
              isValidPhone ? 'hover:bg-green-600' : 'opacity-50 cursor-not-allowed'
            } flex items-center justify-center`}
            disabled={!isValidPhone || isLoading}
          >
            {isLoading && <Spinner />}
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifySubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit code"
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300 flex items-center justify-center"
            disabled={verificationCode.length !== 6 || isLoading}
          >
            {isLoading && <Spinner />}
            {isLoading ? 'Verifying...' : 'Verify and Connect Spotify'}
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneLogin;