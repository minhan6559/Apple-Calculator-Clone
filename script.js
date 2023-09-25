class Calculator{
    constructor(curOperEle, preOperEle){
        this.curOperEle = curOperEle;
        this.preOperEle = preOperEle;
        this.clear();
        this.updateDisplay();
    }

    clear()
    {
        this.curOperText = "";
        this.preOperText = "";
        this.operator = "";
    }

    delete()
    {
        if(this.curOperText.length < 1)
            return;

        this.curOperText = this.curOperText.slice(0, -1);
    }

    convertMinusPlus()
    {
        if(parseFloat(this.curOperText) >= 0 && this.curOperText.length < 28)
            this.curOperText = "-" + this.curOperText;
        else if(parseFloat(this.curOperText) < 0)
            this.curOperText = this.curOperText.slice(1);
    }

    chooseOper(operator)
    {
        if(this.curOperText === "")
            return;

        this.operator = operator;
        
        if(this.preOperText === "")
        {
            this.preOperText = this.curOperText;
        }
        else
        {
            this.preOperText = this.calculate().toString();
        }

        this.curOperText = "";
    }

    appendNum(number)
    {
        if(number === ".")
        {
            if(this.curOperText.includes(".") || this.curOperText.length < 1)
                return;
        }

        if(this.curOperText.length > 27)
            return;

        this.curOperText = this.curOperText.toString() + number.toString();
    }

    calculate()
    {
        if(this.curOperText === "" || this.preOperText === "")
            return;
        
        if(this.curOperText === "-")
        {
            this.curOperText = "";
            this.updateDisplay();
            return;
        }

        let res;
        const preNum = parseFloat(this.preOperText);
        const curNum = parseFloat(this.curOperText);
        switch(this.operator)
        {
            case "÷":
                res = preNum / curNum;
                break;
            case "x":
                res = preNum * curNum;
                break;
            case "-":
                res = preNum - curNum;
                break;
            case "+":
                res = preNum + curNum;
                break;
        }

        return parseFloat(res.toFixed(10)).toString();
    }

    clickOnEqualBtn()
    {
        if(this.curOperText == "" || this.preOperText == "")
            return;
        
        this.curOperText = this.calculate().toString();
        this.preOperText = "";
        this.operator = "";
    }

    getRoundedNumber(numberString)
    {
        if(numberString === "")
            return "";

        return parseFloat(numberString);
    }

    updateDisplay()
    {
        this.preOperEle.innerText = this.getRoundedNumber(this.preOperText) + this.operator;
        this.curOperEle.innerText = this.curOperText;
    }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operBtns = document.querySelectorAll("[data-oper]");
const equalBtn = document.querySelector("[data-equal]");
const clearBtn = document.querySelector("[data-clear]");
const delBtn = document.querySelector("[data-del]");
const convertMinusPlusBtn = document.querySelector("[data-convert-minus-plus]");
const curOperEle = document.querySelector("[data-cur-oper]");
const preOperEle = document.querySelector("[data-pre-oper]");

const calc = new Calculator(curOperEle, preOperEle);

numberBtns.forEach(ele => {
    ele.addEventListener('click', () => {
        calc.appendNum(ele.innerText);
        calc.updateDisplay();
    });
});

clearBtn.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
});

delBtn.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
});

convertMinusPlusBtn.addEventListener('click', () => {
    calc.convertMinusPlus();
    calc.updateDisplay();
});

operBtns.forEach(ele => {
    ele.addEventListener('click', () => {
        calc.chooseOper(ele.innerText);
        calc.updateDisplay();
    });
});

equalBtn.addEventListener('click', () => {
    calc.clickOnEqualBtn();
    calc.updateDisplay();
});