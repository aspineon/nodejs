import supertest from 'supertest';
import chai from 'chai';
import APP from '../index.js';

global.app = APP;
global.request = supertest(APP);
global.expect = chai.expect;