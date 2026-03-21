// Polyfills for Web3Auth
import { Buffer } from 'buffer'
import process from 'process'

// Make Buffer and process available globally
window.Buffer = Buffer
window.process = process
window.global = window.globalThis
