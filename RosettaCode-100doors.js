function getFinalOpenedDoors(numDoors) {
  let doors = new Array(numDoors).fill(false);
  console.log("doors: ", doors);

  doors.forEach((door, i) => {

    let count = 1;
    let dNum = i + 1;
    doors = doors.map((d, idx) => {

      console.log("doors: ", doors);
      if (count % dNum == 0){
        count += 1;
        return !d;
      }
      count += 1;
      return d;

    })
    console.log(`after doors: ${i}`, doors);

  })
  doors = doors.map((d, i) => {
    return [d, i]
    }).filter((d) => {
      if(d[0]){
        return d;
      }
  }).map(d => d[1]+1);
  console.log(doors);
  return doors;
}
