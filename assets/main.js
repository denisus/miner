const startButton = document.getElementById('start');

const xField = document.querySelector("input[name='x']");

const fromField = document.getElementById("from-field");

const toField = document.getElementById("to-field");

const minesField = document.getElementById('mines-count');

const infoBlock = document.querySelector('.field');

const colors = ['grey','orange','blue','green','brown','red'];

var polygon,mines,nums,opened=0;
document.addEventListener("contextmenu", function(e)
{
    e.preventDefault()
});

startButton.addEventListener('click',(e)=>{
    if(xField.value =='' || isNaN(xField.value)){
        alert('Введите число в поле')
    } else if(xField.value < 5){
        alert('Введите чисто больше 5')
    }
    nums = xField.value
    start();
});

function start() {
    opened=0;
    const fields = nums * nums;
    mines = Math.round(fields / 7);
    fromField.innerText = fields;
    toField.innerText = opened;
    minesField.innerText = mines;
    infoBlock.style.display = 'block';
    clearFields = fields-mines;
    generatePolygon()
}

function generatePolygon(){
    polygon = [];
    for(var i=0;i<nums;i++)
    {
        polygon[i]=[];
        for (var j=0;j<nums;j++){
            polygon[i][j]=0
        }
    }
    let n=mines;
    do{
        let x = Math.floor(Math.random()*nums);
        let y = Math.floor(Math.random()*nums);

        if(polygon[x][y]!='o'){
            polygon[x][y] = 'o';
            n--;
        }

    }while (n>0);
    calculateMines();
    document.getElementById('table_cont').innerHTML=''
    let table = document.createElement("table");
    table.id='table';

    for(var i=0;i<nums;i++){
        let tr = document.createElement('tr');
        for(var j=0;j<nums;j++){
            let td = document.createElement('td');
            td.addEventListener('click',clickField);
            td.addEventListener('mousedown',clickFlag);
            td.innerText = '';//polygon[j][i];
            td.style.color = colors[polygon[j][i]];
            tr.appendChild(td)
        }
        table.append(tr)
    }
    document.getElementById('table_cont').append(table);
}

function clickFlag(e){
    if(e.button===2 && !e.currentTarget.classList.contains('clicked')){
        let element = e.currentTarget;
        element.classList.toggle('flag')
    }


}

function calculateMines(){
    for(let i=0;i<nums; i++){
        for(let j=0;j<nums; j++){
            if(polygon[i][j]=='o'){
                continue;
            }
            let count=0;
            let ii = i-1;
            let jj = j-1;
            if(ii>=0 && ii<nums && jj>=0 && jj<nums && polygon[ii][jj]=='o'){
                count++;
            }
            ii = i;
            jj = j-1;
            if(ii>=0 && ii<nums && jj>=0 && jj<nums && polygon[ii][jj]=='o'){
                count++;
            }
            ii = i+1;
            jj = j-1;
            if(ii>=0 && ii<nums && jj>=0 && jj<nums && polygon[ii][jj]=='o'){
                count++;
            }
            ii = i-1;
            jj = j;
            if(ii>=0 && ii<nums && jj>=0 && jj<nums && polygon[ii][jj]=='o'){
                count++;
            }
            ii = i+1;
            jj = j;
            if(ii>=0 && ii<nums && jj>=0 && jj<nums && polygon[ii][jj]=='o'){
                count++;
            }
            ii = i-1;
            jj = j+1;
            if(ii>=0 && ii<nums && jj>=0 && jj<nums && polygon[ii][jj]=='o'){
                count++;
            }
            ii = i;
            jj = j+1;
            if(ii>=0 && ii<nums && jj>=0 && jj<nums && polygon[ii][jj]=='o'){
                count++;
            }
            ii = i+1;
            jj = j+1;
            if(ii>=0 && ii<nums && jj>=0 && jj<nums && polygon[ii][jj]=='o'){
                count++;
            }
            polygon[i][j] = count;
        }
    }
}


function clickField(e){
    let td = e.currentTarget;
    if(td.classList.contains('clicked'))
        return;
    td.classList.remove('flag')
    let tr = td.parentNode;
    let x= td.cellIndex;
    let y = tr.rowIndex;
    let value = polygon[x][y];
    td.innerText = value!=0?value:'';
    td.classList.add('clicked');
    td.data=='clicked1';
    if(value=='o'){
        clearField()
        alert('Вы проиграли')
    }
    applyCell(x,y);
}

function clearField(){
    let rows = document.getElementById('table').children;

    for(let i=0;i<rows.length;i++){
        let cols = rows[i].children;
        for(let j=0;j<cols.length;j++){
            //setTimeout(function(){
                cols[j].classList.add('clicked');
                cols[j].innerText = polygon[j][i]!=0?polygon[j][i]:'';
                if(polygon[j][i]=='o'){
                    cols[j].classList.add('mine');
                    cols[j].classList.remove('flag');
                }
            //},5000)

        }
    }
}

function applyCell(x,y){

    if(undefined === polygon[x] || undefined ===polygon[x][y] || polygon[x][y] == 'o'){
        return;
    }
    let row = document.querySelectorAll('#table tr')[y];
    let col = row.children;
    let cell = col[x];
    //console.log(cell.classList);
    if(cell.data=='clicked1'){
        return
    }
    opened++;
    toField.innerText = opened;
    cell.classList.add('clicked');
    cell.data='clicked1';
    cell.innerHTML = polygon[x][y]==0?'':polygon[x][y];
    if(clearFields== opened){
        alert("Поздравляем, вы выиграли");
    }
    if(polygon[x][y] >0){
        return;
    }

    //applyCell(x+1,y);
    applyCell(x+1,y+1);
    applyCell(x,y+1);
    applyCell(x-1,y+1);
    applyCell(x-1,y);
    applyCell(x-1,y-1);
    applyCell(x,y-1);
    applyCell(x+1,y-1);
    applyCell(x+1,y);
    return;
}

// for(let i=0;i<10;i++){
//     //console.log(i)
//     setTimeout(()=>{console.log(i)},200*i);
// }
// for (let i = 0; i < 10; i++) {
//     //console.log(i);
//     setTimeout(function() {
//         console.log(`The number is ${i}`);
//     }, 2000);
// }