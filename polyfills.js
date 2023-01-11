Array.prototype.muReduce = function (cb, initial) {
  const array = this;
  const length = array === null ? 0 : array.length;
  let index = -1;

  if (!initial && length) {
    initial = array[++index]
  }

  while (++index < length) {
    initial = cb(initial, array[index], index, array)
  }
  return initial
}
























Array.prototype.arrayReduce = function (iteratee, accumulator, initAccum) {
  const array = this;
  let index = -1
  const length = array == null ? 0 : array.length

  if (initAccum && length) {
    accumulator = array[++index]
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array)
  }
  return accumulator
}



const customReduce = () => {

  // Check if the `reduce()` method is not defined on the Array prototype
  // Define the `reduce()` method on the Array prototype
  Array.prototype.myReduce = function (callback, initialValue) {
    // Store the current collection
    var collection = this;

    // Check if the collection is an array or an object
    var isArray = Array.isArray(collection);

    // Initialize the current value and the current index
    var value, index;

    // Check if the collection is an array
    if (isArray) {
      // If the collection is an array, set the initial value and index
      // based on the provided initial value
      if (initialValue !== undefined) {
        value = initialValue;
        index = 0;
      } else {
        value = collection[0];
        index = 1;
      }
    } else {
      // If the collection is an object, set the initial value and index
      // based on the first enumerable property of the object
      var keys = Object.keys(collection);
      if (initialValue !== undefined) {
        value = initialValue;
        index = 0;
      } else {
        value = collection[keys[0]];
        index = 1;
      }
    }

    // Loop through the collection, starting at the specified index
    for (; index < collection.length; index++) {
      // Call the callback function with the current value and the current element,
      // storing the result as the new current value
      value = callback(value, collection[index]);
    }

    // Return the final current value
    return value;
  };

  // var numbers = [1, 2, 3, 4, 5];

  // // Use the `reduce()` method to sum the numbers in the array
  // var sum = numbers.myReduce(function (a, b) {
  //   return a + b;
  // }, 0);

  // // Print the sum of the numbers
  // console.log(sum); // Output: 15

  // Define an object with properties and values
  var obj = {
    prop1: 1,
    prop2: 2,
    prop3: 3
  };

  // Use the `reduce()` method to sum the values of the object
  var sum = Object.keys(obj).reduce(function (a, b) {
    return a + obj[b]
  })
}


const reduce = () => {
  // const TAG = 'Array.Reduce -> Array.cReduce'
  // console.log(TAG)
  // /**
  //  * Array.reduce takes mainly 2 arguments, 
  //  * 1. Callback
  //  * 2. initial value
  //  */

  // // Array.prototype.cReduce = function(cb, ){

  // // }

  // const arr = [1, 2, 3, 4]
  // const arr1 = [{ name: 'kamalesh', sex: 'male' }, { name: 'kamalesh 01', sex: 'male' }, { name: 'nipa', sex: 'female' }, { name: 'kamalesh 02', sex: 'male' }]

  // // const animals = [
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



  const animals = [
    '🐭', '🐹',
    '🐻', '🐼', '🐮',
    '🐷', '🐧', '🐦'
  ]
  const createAnimalGroup = (allAnimals, animalGroupCount) => allAnimals.muReduce((groupMembers, currentAnimal, currentAnimalPosition) => (currentAnimalPosition % animalGroupCount === 0) ?
    [...groupMembers, allAnimals.slice(currentAnimalPosition, currentAnimalPosition + animalGroupCount)]
    : groupMembers
    , [])

  const forest = createAnimalGroup(animals, 2)
  // output => [ [ '🐭', '🐹' ], [ '🐻', '🐼' ], [ '🐮', '🐷' ], [ '🐧', '🐦' ] ]
  console.log(forest)



  // const animals = ['🐭', '🐹', '🐻', '🐼', '🐮', '🐷', '🐧', '🐦']
  // const createAnimalGroup = (arr, count) => arr.reduce((acc, _, index) => (index % count === 0) ?
  //   [...acc, arr.slice(index, index + count)]
  //   : acc
  //   , [])

  // const forest = createAnimalGroup(animals, 2)
  // // output => [ [ '🐭', '🐹' ], [ '🐻', '🐼' ], [ '🐮', '🐷' ], [ '🐧', '🐦' ] ]
  // console.log(forest)



  // =============  Serialize query string ==============

  // const animals = {
  //   'panda': '🐼',
  //   'cow': '🐮',
  //   'pig': '🐷'
  // }

  // const animalLine = (mixAnimal) => Object.keys(mixAnimal).reduce((query, key, index) => `${query}${key}=${mixAnimal[key]}&`, '?').slice(0, -1)
  // // TIP: you can use encodeURIComponent(mixAnimal[key])
  // console.log(animalLine(animals))
  // // Output => ?panda=🐼&cow=🐮&pig=🐷


  // =============  Grouping  ==============

  // const allAnimals = [{ animal: '🐆', speed: 80 }, { animal: '🐱', speed: 20 }, { animal: '🐰', speed: 20 }, { animal: '🐯', speed: 80 }, { animal: '🐌', speed: 5 }]

  // const groupBy = (animals, property) => animals.reduce((acc, currentAnimal) => {
  //   if (property in currentAnimal) {
  //     const value = currentAnimal[property]
  //     if (!acc[value]) acc[value] = []
  //     acc[value].push(currentAnimal)
  //   }
  //   return acc
  // })
  // console.log(groupBy(allAnimals, 'speed'))


  // =============  Array -> object  ==============

  // const animals = ['🐼', '🐮', '🐷']
  // const obj = animals.arrayReduce((acc, animal, index) => ({ ...acc, [`animal-${index + 1}`]: animal }), {})
  // console.log(obj)
};




module.exports = { reduce, customReduce };
