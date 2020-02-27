'use strict';
var mocha = require('mocha');
var chakram = require('chakram');
var request = chakram.request;
var expect = chakram.expect;

describe('tests for /login', function() {
    describe('tests for post', function() {
        it('should respond 200 for "OK"', function() {
            var response = request('post', 'http://localhost:3000/login', { 
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();
        });
    
    });
});