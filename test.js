const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;




const myObject = {
  sum: function (a, b) {
    return a + b;
  },
  fetchData: function (url) {
    return "real data";
  }
};

// For Spying Action
describe('Sinon Spies', function () {
  it('should spy on a function', function () {
    const spy = sinon.spy(myObject, 'sum');
    myObject.sum(2, 6);

    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWithExactly(2, 6);
    spy.resetHistory();
    // Other assertions or expectations
  });
});


// For Stubbing Action
describe('Sinon Stubs', function () {
  it('should stub a function', function () {
    const stub = sinon.stub(myObject, 'fetchData').returns('mocked data');
    const result = myObject.fetchData();

    expect(result).to.equal('mocked data');
    expect(stub).to.have.been.calledOnce;
    stub.restore();
    const result2 = myObject.fetchData();
    expect(result2).to.equal("real data");
    // Other assertions or expectations
  });


// For Mocking Action
  it('should stub a function using sandbox', async function () {
    const sandbox = sinon.createSandbox();
    const stub = sandbox.stub(myObject, 'fetchData').callsFake(async (url) => {
      if (url === '/api/endpoint') {
        // Simulate a successful response
        return { status: 200, data: { message: 'API response' } };
      } else {
        // Handle other URLs or scenarios if needed
        return { status: 404, data: { error: 'Not Found' } };
      }
    });
    const response = await myObject.fetchData('/api/endpoint');
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('API response');

  });
});

