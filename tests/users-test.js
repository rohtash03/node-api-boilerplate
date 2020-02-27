'use strict';
var mocha = require('mocha');
var chakram = require('chakram');
var request = chakram.request;
var expect = chakram.expect;

describe('tests for /users', function() {
    describe('tests for get', function() {
        it('should respond 200 for "OK"', function() {
            var response = request('get', 'http://localhost:3000/users', { 
                'qs': {"name":"abc"},
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();
        });


        it('should respond 400 for "Bad Request"', function() {
            var response = request('get', 'http://localhost:3000/users', { 
                'qs': {"name":"abc"},
                'time': true
            });

            expect(response).to.have.status(400);
            return chakram.wait();
        });
    
    });
    
    describe('tests for post', function() {
        it('should respond 200 for "OK"', function() {
            var response = request('post', 'http://localhost:3000/users', { 
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();
        });
    
    });
});