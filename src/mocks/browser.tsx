/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { setupWorker } from 'msw'
import { handlers } from './handlers'

// Configure the Service Worker for in-browser request interception
export const worker = setupWorker(...handlers)
