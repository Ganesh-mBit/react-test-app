export interface BaseCountriesType {
  name: string
  regions: string[]
  isoCode: string
  dialCode: string
  format: string
}

const baseCountries: BaseCountriesType[] = [
  {
    name: 'United States',
    regions: [
      'america', 'north-america'
    ],
    isoCode: 'US',
    dialCode: '+1',
    format: '+. (...) ...-....'
  },
  {
    name: 'Canada',
    regions: [
      'america', 'north-america'
    ],
    isoCode: 'CA',
    dialCode: '+1',
    format: '+. (...) ...-....'
  },
  {
    name: 'Australia',
    regions: [
      'oceania'
    ],
    isoCode: 'AU',
    dialCode: '+61',
    format: '+.. ... ... ...'
  },
  {
    name: 'France',
    regions: [
      'europe', 'european-union'
    ],
    isoCode: 'FR',
    dialCode: '+33',
    format: '+.. . .. .. .. ..'
  },
  {
    name: 'South Africa',
    regions: [
      'africa'
    ],
    isoCode: 'ZA',
    dialCode: '+27',
    format: '+.. .. ... ....'
  },
  {
    name: 'United Kingdom',
    regions: [
      'europe', 'european-union'
    ],
    isoCode: 'GB',
    dialCode: '+44',
    format: '+.. .... ......'
  },
  {
    name: 'India',
    regions: [
      'asia'
    ],
    isoCode: 'IN',
    dialCode: '+91',
    format: '+.. .....-.....'
  }
];

export default baseCountries;
