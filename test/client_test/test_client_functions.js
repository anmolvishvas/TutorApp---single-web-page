import { checkLoginUser } from "./client_function.js";

let expect = chai.expect;

//Mocha test for login session function
describe('#testSession', () => {
    it ('should return the value of logged in tutor in local storage', (done) => {
        //Run some tests that sensibly explore the behaviour of the function
        localStorage.setItem('tutor', false);
        let result = checkLoginUser();
        expect(result).to.equal('false');

        localStorage.setItem('tutor', true);
        result = checkLoginUser();
        expect(result).to.equal('true');

        done();
    });
});