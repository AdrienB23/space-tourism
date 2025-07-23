import {Destination} from './destination';
import {Crew} from './crew';
import {Technology} from './technology';

export interface PageData {
  dest: Destination[]
  crew: Crew[]
  tech: Technology[]
}
