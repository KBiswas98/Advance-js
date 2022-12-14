const reduce = () => {
  const TAG = 'Array.Reduce -> Array.cReduce'
  console.log(TAG)
  /**
   * Array.reduce takes mainly 2 arguments, 
   * 1. Callback
   * 2. initial value
   */

  // Array.prototype.cReduce = function(cb, ){

  // }

  const arr = [1, 2, 3, 4]
  const arr1 = [{ name: 'kamalesh', sex: 'male' }, { name: 'kamalesh 01', sex: 'male' }, { name: 'nipa', sex: 'female' }, { name: 'kamalesh 02', sex: 'male' }]

  // const animals = [
  //   [ '🐭' , '🐹' ],
  //   [ '🐻' , '🐼' ],
  //   [ '🐮' , '🐷' ],
  //   [ '🐧' , '🐦' ]
  // ];
  // let forest = animals.reduce((a,b) => [...a, ...b],['🌳'])
  // console.log(forest)


  // const animals = [
  //   [ '🐭' , ['🐹', '🐱'] ],
  //   [ '🐻' ],
  //   [ '🐮' , ['🐷', [ '🐯', '🦁']] ],
  //   [ '🐧' , ['🐦'] ]
  // ];
  // const allAnimals = (arr = [] ) => arr.reduce((acc,curr) => acc.concat(Array.isArray(curr) ? allAnimals(curr) : curr ),[])
  // const forest = allAnimals(animals)
  // // forest => ['🐭', '🐹', '🐱','🐻', '🐮', '🐷','🐯', '🦁', '🐧','🐦']
  // console.log(forest)



  // const animals = [
  //   '🐭', '🐹',
  //   '🐻', '🐼', '🐮',
  //   '🐷', '🐧', '🐦'
  // ]
  // const createAnimalGroup = (allAnimals, animalGroupCount) => allAnimals.reduce((groupMembers, currentAnimal, currentAnimalPosition) => (currentAnimalPosition % animalGroupCount === 0) ?
  //   groupMembers.push(allAnimals.slice(currentAnimalPosition, currentAnimalPosition + animalGroupCount))
  //   : groupMembers
  //   , [])

  // const forest = createAnimalGroup(animals, 2)
  // // output => [ [ '🐭', '🐹' ], [ '🐻', '🐼' ], [ '🐮', '🐷' ], [ '🐧', '🐦' ] ]
  // console.log(forest)



  // const animals = ['🐭', '🐹', '🐻', '🐼', '🐮', '🐷', '🐧', '🐦']
  // const createAnimalGroup = (arr, count) => arr.reduce((acc, _, index) => (index % count === 0) ?
  //   [...acc, arr.slice(index, index + count)]
  //   : acc
  //   , [])

  // const forest = createAnimalGroup(animals, 2)
  // // output => [ [ '🐭', '🐹' ], [ '🐻', '🐼' ], [ '🐮', '🐷' ], [ '🐧', '🐦' ] ]
  // console.log(forest)



  // =============  Serialize query string ==============

  const animals = {
    'panda': '🐼',
    'cow': '🐮',
    'pig': '🐷'
  }

  const animalLine = (mixAnimal) => Object.keys(mixAnimal).reduce((query, key) => `${query} ${!query??'?'} ${key}=${encodeURIComponent(mixAnimal[key])}`, '?')
  console.log(animalLine(animals))



};

module.exports = { reduce };
