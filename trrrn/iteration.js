let num= [1,2,3,4,5,20,21,32]
console.log(num)
num.forEach(t)

function t (a){
    if (a>18){return a}
}
let ans = num.map(t)
console.log(ans)