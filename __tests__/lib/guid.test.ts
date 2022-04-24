import { generateGuid, isValidGuid } from 'lib/guid'

describe('lib/guid::isValidGuid', () => {
  it('returns true with a valid 32 character hexadecimal', () => {
    const isValid = isValidGuid('9094E4C980C74043A4B586B420E69DDF')
    expect(isValid).toBeTruthy()
  })

  it('returns false with an invalid value', () => {
    const isValid = isValidGuid('abc123')
    expect(isValid).toBeFalsy()
  })

  it('returns false with a valid substring value', () => {
    const isValid = isValidGuid('Z9094E4C980C74043A4B586B420E69DDF')
    expect(isValid).toBeFalsy()
  })
})

describe('lib/guid::generateGuid', () => {
  it('returns a 32 hexadecimal character string', () => {
    const guid = generateGuid()
    const isValid = isValidGuid(guid)
    expect(guid).toHaveLength(32)
    expect(isValid).toBeTruthy()
  })
})
