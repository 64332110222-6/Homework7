const loginForm = document.querySelector(".login-form");
const usernameInput = document.querySelector(".login-form #username")
const passwordInput = document.querySelector(".login-form #password")
const roleInput = document.querySelector(".login-form #role")

const users = [
  { username: 'andy1', password: 'andy1234'},
  { username: 'bobby2', password: 'bobby2345'},
  { username: 'candy3', password: 'candy3456'}
]
let lastPo = users.length - 1;
// ถ้า validate ผ่านให้ไปทำการ login โดยตรวจสอบ username, password
// กับ array แบบที่เคยทำตอนโจทย์ javascript แล้วแจ้ง login successful

const validateInput = (inputObj) => {
  console.log(inputObj);

  usernameInput.style.border = '';
  passwordInput.style.border = '';
  roleInput.style.border = '';
  //step1: check input ต้องไม่เป็นค่าว่างหรือใส่ space มาล้วนๆ
  if (inputObj['username'] == '' || inputObj['password'] == '' || inputObj['role'] == '') {
    console.log("step1: Incorrect");
    console.log("ทุก input ต้องไม่เป็นค่าว่างหรือ ใส่ space มาล้วนๆ");
    alert("ทุก input ต้องไม่เป็นค่าว่างหรือ ใส่ space มาล้วนๆ");
    usernameInput.style.border = '2px solid red';
    passwordInput.style.border = '2px solid red';
    roleInput.style.border = '2px solid red';
  } else {
    console.log("step1: Correct");

    //step2: check ความยาวของ Username และ Password
    if (inputObj['username'].length <= 3 || inputObj['password'].length <= 4) {
      console.log("step2: Incorrect");
      console.log("Username ความยาวต้องมากกว่า 3 ตัวอักษร และ Password ความยาวต้องมากกว่า 4 ตัวอักษร");
      alert("Username ความยาวต้องมากกว่า 3 ตัวอักษร และ Password ความยาวต้องมากกว่า 4 ตัวอักษร");
      usernameInput.style.border = '2px solid red';
      passwordInput.style.border = '2px solid red';
    } else {
      console.log("step2: Correct");

      //step2.5: ตัด space หน้า-หลัง ของ username และ password
      let usernameTrim = inputObj['username'].trim()
      let passwordTrim = inputObj['password'].trim()

      //step3: check Username ห้ามนำหน้าด้วยตัวเลข
      if (!isNaN(usernameTrim[0])) {
        console.log("step3: Incorrect");
        console.log("Username ห้ามนำหน้าด้วยตัวเลข");
        alert("Username ห้ามนำหน้าด้วยตัวเลข");
        usernameInput.style.border = '2px solid red';
      } else {
        console.log("step3: Correct");

        //step4: check Password ต้องมีทั้งตัวเลขและตัวอักษร
        let passwordCheckNum = 0;
        let passwordCheckChar = 0;
        for (let i = 0; i < passwordTrim.length; i++) {
          if (!isNaN(passwordTrim[i])) {
            passwordCheckNum++;
          } else {
            passwordCheckChar++;
          }
        }
        if ((passwordCheckNum == 0) || (passwordCheckChar == 0)) {
          console.log("step4: Incorrect");
          console.log("Password ต้องมีทั้งตัวเลขและตัวอักษร");
          alert("Password ต้องมีทั้งตัวเลขและตัวอักษร");
          passwordInput.style.border = '2px solid red';
        } else {
          console.log("step4: Correct");

          //step5: check Username และ Password จะต้องไม่มี space คั่นกลาง
          if (usernameTrim.includes(' ') == true || passwordTrim.includes(' ') == true) {
            console.log("step5: Incorrect");
            console.log("Username และ Password จะต้องไม่มี space คั่นกลาง");
            alert("Username และ Password จะต้องไม่มี space คั่นกลาง");
            usernameInput.style.border = '2px solid red';
            passwordInput.style.border = '2px solid red';
          } else {
            let checkUser = 0;
            for (let i = 0; i <= lastPo; i++) {
              if ((usernameTrim === users[i].username) && (passwordTrim === users[i].password)) {
                checkUser =1;
                break
              } else {
                checkUser =0;
                console.log("step5: Correct");
              }
            }
            if(checkUser == 1){
              alert('Login Successful Wellcome: ' + usernameTrim);
              location.assign("https://www.example.com")
            }else{
              alert(checkUser)
              alert('No access!');
            }
          }
        }
      }
    }
  }
}

const hdlLogin = (e) => {
  e.preventDefault();
  console.log(loginForm.elements);
  let allInput = loginForm.elements;
  let inputObj = {};
  for (let el of loginForm.elements) {
    inputObj[el.id] = el.value;
  }
  validateInput(inputObj);
};

loginForm.addEventListener("submit", hdlLogin);