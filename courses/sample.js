
async function searchPlaces(){
    const res = await fetch(`http://localhost:3000/course/`)
    console.log(res);

    return res.json();
}

console.log(searchPlaces.json);
