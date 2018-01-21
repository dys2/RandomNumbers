const axios = require('axios');

export async function sequenceGen() {
  try {
    const res = await axios.get('https://www.random.org/integers/?num=128&min=0&max=255&col=3&base=10&format=plain&rnd=new');
    const nums = res.data.split('\n').map(val => val.split('\t')).slice(0,-1); // slice removes extra /n
    return nums;
  } catch(err) {
    console.log(err);
  }
}

