import {masterHandlers} from '@/tests/server/handlers/master'
import {resumeGetHandlers, resumePutHandlers} from '@/tests/server/handlers/resume'

export const handlers = [...resumeGetHandlers, ...resumePutHandlers, ...masterHandlers]
