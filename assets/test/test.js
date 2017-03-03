

QUnit.test("Here's a test that should always pass", function (assert) {
    assert.ok(1 <= "3", "1<3 - the first agrument is 'truthy', so we pass!");
});

QUnit.test('Testing calculateArea function with several sets of inputs', function (assert) {
    assert.equal(calculateTotal(radio), 'Tested with two relatively small positive numbers');
    assert.equal(formatCurrency(5), 'Tested with two negative numbers. Any arguments less than 1 will be set to 1.');
    assert.equal(InitForm(), 'Tested with two large positive numbers. Any arguments greater than 100 will be set to 100.');
        //throws( block                                    [, expected ] [, message ] ) 
    assert.throws(function () { fun(); }, /The given argument is not a number/, 'Passing in null correctly raises an Error');
        //throws( block                                    [, expected ] [, message ] ) 
    //assert.throws(function () { App.calculateArea("Christine","Christine"); }, /The given argument is not a number/, 'Passing in a string correctly raises an Error');
});

