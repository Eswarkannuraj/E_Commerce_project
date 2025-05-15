import{formatCurrency} from '../../scripts/utils/money.js'

console.log('test suite: formatCurrency');

console.log('convert cents  to dollars');

if(formatCurrency(2095)==='20.95'){
  console.log('passed');
}else{
  console.log('failed');
};

console.log('works with zero');

if(formatCurrency(0)==='0.00'){
  console.log('passed');
}else{
  console.log('failed');
};

console.log('rounds upto nearest cent');

if(formatCurrency(2000.5)==='20.01'){
  console.log('passed');
}else{
  console.log('failed');
};


describe('test suite:formatCurrency',()=>{
  it('round down to nearest cents',()=>{
    expect(formatCurrency(2000)).toEqual('20.00');
    expect(formatCurrency(0)).toEqual('0.00');
    expect(formatCurrency(-2000.4)).toEqual('-20.00');
  })
});

