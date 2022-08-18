import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addKeywords from 'ajv-keywords'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
addKeywords(ajv)

export default ajv
