import readline from 'readline';

let students = [{
  age: 32,
  examScores: [],
  gender: 'male',
  name: 'edu'
},
{
  age: 29,
  examScores: [],
  gender: 'female',
  name: 'silvia'
}]

const availableMaleNames = ['pepe', 'juan', 'victor', 'Leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout, 
});

const isInt = (num) => {
  return !Number.isNaN(num)
}

function getOptionConsole() {
  const promise = new Promise((resolve, reject) => { 
      rl.question('Elige una opción: ', (num) => {
          rl.pause();
          if (isInt(num)) {
              num = Number.parseInt(num);
              resolve(num);              
          } else {
              reject('Introduce un número válido');
          }
      })
  
  })
  return promise;
}

async function displayOptions() {
  let selected_option;
  let only_female;
  let student_ages;
  let females_list;
  do {     
    try { 
      //Lista de Menu a elegir: 
      console.log(
        "\nListado de opciones:",
        "\n1- Mostrar en formato de tabla todos los alumnos.",
        "\n2- Mostrar por consola la cantidad de alumnos que hay en clase.",
        "\n3- Mostrar por consola todos los nombres de los alumnos.",
        "\n4- Eliminar el último alumno de la clase.",
        "\n5- Eliminar un alumno aleatoriamente de la clase.",
        "\n6- Mostrar por consola todos los datos de los alumnos que son chicas.",
        "\n7- Mostrar por consola el número de chicos y chicas que hay en la clase.",
        "\n8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.",
        "\n9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.",
        "\n10- Añadir un alumno nuevo con los siguientes datos",
        "\n11- Mostrar por consola el nombre de la persona más joven de la clase.",
        "\n12- Mostrar por consola la edad media de todos los alumnos de la clase.",
        "\n13- Mostrar por consola la edad media de las chicas de la clase.",
        "\n14- Añadir nueva nota a los alumnos.",
        "\n15- Ordenar el array de alumnos alfabéticamente según su nombre.",      
      ); 
      //Se guardará en la variable el nro que seleccione el usuario:   
      selected_option = await getOptionConsole();    

switch(selected_option) {  
  case 1:    
    console.table(students)
    break;
  case 2:    
    console.log('El total de alumnos que hay en la clase es: ', students.length)
    break;
  case 3:
    console.log('Listado de nombres de todos los alumnos: ', students.map(student => " " + [student.name]))
    break;
  case 4:
    students.pop();
    console.table(students)
    break;
  case 5:    
    students.splice(getRandomNumber(0, students.length), 1);
    console.log('Lista actualizada con un alumno menos eliminado aleatoriamente: ', students.map(student => " " + [student.name]))
    break;
  case 6:    
    only_female = students.filter(student => student.gender === "female");
    only_female.length > 0 ? console.table(only_female): console.log('No hay chicas en la clase.');           
    break;
  case 7:
    only_female = students.filter(student => student.gender === "female");
    const only_male = students.filter(student => student.gender === "male");
    const total_female = only_female.length;
    const total_male = only_male.length;
    console.log('La cantidade de chicas en el curso es de: ' + total_female + ' y de chicos es de : ' + total_male)
    break;
  case 8:
    const all_females = students.length > 0 ? students.every(student => student.gender === 'female') : false;
    console.log('¿Los alumnos son todos chicas?: ', all_females);    
    break;
  case 9:
    const student_20_25 = students.filter(student => student.age >= 20 && student.age <= 25 );
    const student_names = students.length > 0 ? student_20_25.map(student => student.name) : 'No hay alumnos de dicha edad esta clase.'
    console.log('Alumnos entre 20 y 25 años: ', student_names); 
    break;
  case 10:
    const randomGender = availableGenders[Math.floor(Math.random()*availableGenders.length)];
    const randomName = randomGender === 'female'? availableFemaleNames[Math.floor(Math.random()*availableFemaleNames.length)] : availableMaleNames[Math.floor(Math.random()*availableFemaleNames.length)];
    let randomAge = getRandomNumber(20, 50);
    students.push({ age: randomAge, examScores: [], gender: randomGender, name: randomName });    
    console.table(students);    
    break;
  case 11:
    student_ages = students.map(student => student.age);
    const younger_age = Math.min(...student_ages);
    const younger_student = students[student_ages.indexOf(younger_age)];
    const younger_name = students.length > 0 ?  younger_student.name : 'No hay alumnos en esta clase.';
    console.log('El alumno/a más joven es: ', younger_name);    
    break;
  case 12:
    student_ages = students.map(student => student.age);
    const sum_students_ages = students.length > 0 ? student_ages.reduce((sum, n) => sum + n, 0) : 0;
    const avgStudetsAges = students.length > 0 ? Math.round(sum_students_ages / students.length) : 0; 
    console.log('Edad media de todos los alumnos de la clase : ',avgStudetsAges); 
    break;
  case 13:
    females_list = students.filter(student => student.gender ==='female');
    const femalesAges = females_list.map(female => female.age);
    const sumFemalesAges = femalesAges.reduce((sum, n) => sum + n, 0);
    const avgFemalesages = students.length > 0 ? Math.round(sumFemalesAges / females_list.length) : 'No hay alumnos en esta clase. Para añadir uno nuevo, elige la opción 10.';
    console.log('Edad media de las alumnas: ', avgFemalesages);    
    break;
  case 14:
    students.forEach(student => student.examScores.push(getRandomNumber(0, 10)));     
    console.table(students)
    break;
  case 15:
    function sort_list(x, y){
      if (x.name < y.name) {return -1;}
      if (x.name > y.name) {return 1;}
      return 0;
    }
    const ordered_list = students.sort(sort_list);
    console.log('Lista ordenada alfabéticamente según nombre: ', ordered_list.map(student => " " + [student.name]))    
    break;  
  }      
  } catch (error) {
      console.log(error)
      process.exit(0)
  }
} while (selected_option > 0 && selected_option <= 15)
}

displayOptions()
