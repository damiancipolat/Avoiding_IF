# Avoid use IF on our JS scripts:

<img src="https://github.com/damiancipolat/Avoiding_IF/blob/master/doc/LOGO.png?raw=true" width="125px" align="right" />

Well, I write this article because lately I was dealing with source code in js that had an excessive amount of if statement,
at levels that I had never seen. That is why I think it is very important to share these simple techniques that will help us to write code without having to think about the "if" when deciding.

I am going to explain 6 ways on how to do this. The idea of ​​this is not to enter into paranoia of never using IF, it is to open the head to new ways of thinking about our decisions in JS.

<a name="categories"></a>
### Categories:
- [Ternary operator](#ternary_operator)
- [Short circuit](#short_circuit)
- [Function delegation](#function_delegation)
- [Non-branching strategie](#no_switch)
- [Functions as Data](#function_as_data)
- [Polymorfism](#polymorfism)

<a name="ternary_operator"></a>
## 1) Ternary operator:
We are talking about this "**condition ? expr1 : expr2**", very easy.

#### Example 1:

- **Code with IF**:
```javascript
function saveCustomer(customer) {
  if (isCustomerValid(customer)) {
    database.save(customer)
  } else {
    alert('customer is invalid')
  }
}
```

- **Refactored code**:
```javascript
function saveCustomer(customer) {
  return isCustomerValid(customer)
    ? database.save(customer)
    : alert('customer is invalid')
}
```

- **ES6 style**:
```javascript
const saveCustomer = customer =>isCustomerValid(customer)?database.save(customer):alert('customer is invalid')
```

#### Example 2:

- **Code with IF**:
```javascript
function customerValidation(customer) {
  if (!customer.email) {
    return error('email is require')
  } else if (!customer.login) {
    return error('login is required')
  } else if (!customer.name) {
    return error('name is required')
  } else {
    return customer
  }
}
```

- **Refactored code**:
```javascript
// ES6 style custom formatted ternary magic
const customerValidation = customer =>
  !customer.email   ? error('email is required')
  : !customer.login ? error('login is required')
  : !customer.name  ? error('name is required')
                    : customer
```

#### Example 3:

- **Code with IF**:
```javascript
function getEventTarget(evt) {
    if (!evt) {
        evt = window.event;
    }
    if (!evt) {
        return;
    }
    var target;
    if (evt.target) {
        target = evt.target;
    } else {
        target = evt.srcElement;
    }
    return target;
}
```

- **Refactored code**:
```javascript
function getEventTarget(evt) {
  evt = evt || window.event;
  return evt && (evt.target || evt.srcElement);
}
```

**[⮬ back to top](#categories)**

<a name="short_circuit"></a>
## 2) Short circuit:
It is a technique that uses the AND and OR operators to evaluate expressions.

https://codeburst.io/javascript-short-circuit-conditionals-bbc13ac3e9eb

```javascript
true || true;
// true
true || false;
// true
false || false;
// false
```

#### Example 1:

- **Code with IF**:
```javascript
const isOnline = true;
const makeReservation= ()=>{};
const user = {
	name:'Damian',
	age:32,
	dni:33295000
};

if (isOnline){
	makeReservation(user);
}

```

- **Refactored code**:
```javascript
const isOnline = true;
const makeReservation= ()=>{};
const user = {
	name:'Damian',
	age:32,
	dni:33295000
};

//Apply the short circuit to avoid the if.
isOnline&&makeReservation(user);
```

#### Example 2:

- **Code with IF**:
```javascript
const active = true;
const loan = {
	uuid:123456,
	ammount:10,
	requestedBy:'rick'
};

const sendMoney = ()=>{};

if (active&&loan){
	sendMoney();
}

```

- **Refactored code**:
```javascript

const active = true;
const loan = {
	uuid:123456,
	ammount:10,
	requestedBy:'rick'
};

const sendMoney = ()=>{};

//Apply short circuit in this case, the loan is evaluated true because !=undefined
active && loan && sendMoney();
```

**[⮬ back to top](#categories)**

<a name="function_delegation"></a>
## 3) Function delegation:
This technique mix the short circuit and separation code block with functions.

#### Example 1:

- **Code with IF**:
```javascript
function itemDropped(item, location) {
    if (!item) {
        return false;
    } else if (outOfBounds(location) {
        var error = outOfBounds;
        server.notify(item, error);
        items.resetAll();
        return false;
    } else {
        animateCanvas();
        server.notify(item, location);
        return true;
    }
}
```

- **Refactored code**:
```javascript
function itemDropped(item, location) {
    var dropOut = function() {
        server.notify(item, outOfBounds);
        items.resetAll();
        return false;
    }
 
    var dropIn = function() {
        server.notify(item, location);
        animateCanvas();
        return true;
    }
 
    return !!item && (outOfBounds(location) ? dropOut() : dropIn());
}
```

**[⮬ back to top](#categories)**


<a name="no_switch"></a>
## 4) Non branching strategy:
This technique try to avoid the use of switch statemente. The idea is to create a map with keys/values and using a function
to access the value of the key passed as parameter.

The idea came from this link: https://medium.com/chrisburgin/rewriting-javascript-replacing-the-switch-statement-cfff707cf045

#### Example 1:

- **Code with SWITCH**:
```javascript
switch(breed){
	case 'border':
		return 'Border Collies are good boys and girls.';
		break;	
	case 'pitbull':
		return 'Pit Bulls are good boys and girls.';
		break;	
	case 'german':
		return 'German Shepherds are good boys and girls.';
		break;
	default:
		return 'Im default'

}
```

- **Refactored code**:
```javascript

const dogSwitch = (breed) =>({
  "border": "Border Collies are good boys and girls.",
  "pitbull": "Pit Bulls are good boys and girls.",
  "german": "German Shepherds are good boys and girls.",  
})[breed]||'Im the default';


dogSwitch("border xxx")

```

**[⮬ back to top](#categories)**


<a name="function_as_data"></a>
## 5) Functions as Data:
We know that in JS the function are first class, so using it we can split the code into a function objects.

#### Example 1:

- **Code with IF**:
```javascript

const calc = {
    run: function(op, n1, n2) {
        var result;
        if (op == "add") {
            result = n1 + n2;
        } else if (op == "sub" ) {
            result = n1 - n2;
        } else if (op == "mult" ) {
            result = n1 * n2;
        } else if (op == "div" ) {
            result = n1 / n2;
        }
        return result;
    }
}
 
calc.run("sub", 5, 3); //2

```

- **Refactored code**:
```javascript
const calc = {
    add : function(a,b) {
        return a + b;
    },
    sub : function(a,b) {
        return a - b;
    },
    mult : function(a,b) {
        return a * b;
    },
    div : function(a,b) {
        return a / b;
    },
    run: function(fn, a, b) {
        return fn && fn(a,b);
    }
}

calc.run(calc.mult, 7, 4); //28
```

**[⮬ back to top](#categories)**

<a name="polymorfism"></a>
## 5) Polymorphism:
Polymorphism is the ability of an object to take on many forms. The most common use of polymorphism in OOP occurs when a parent class reference is used to refer to a child class object.

#### Example 1:

- **Code with IF**:
```javascript
const bob = {
  name:'Bob',
  salary:1000,
  job_type:'DEVELOPER'
};

const mary = {
  name:'Mary',
  salary:1000,
  job_type:'QA'
};

const calc = (person) =>{
    
    if (people.job_type==='DEVELOPER')
        return person.salary+9000*0.10;

    if (people.job_type==='QA')
        return person.salary+1000*0.60;
}

console.log('Salary',calc(bob));
console.log('Salary',calc(mary));

```

- **Refactored code**:
```javascript
//Create function to different behaviour, same parameter call.
const qaSalary  = (base) => base+9000*0.10;
const devSalary = (base) => base+1000*0.60;

//Add function to the object.
const bob = {
  name:'Bob',
  salary:1000,
  job_type:'DEVELOPER',
  calc: devSalary
};

const mary = {
  name:'Mary',
  salary:1000,
  job_type:'QA',
  calc: qaSalary
};

//Same call.
console.log('Salary',bob.calc());
console.log('Salary',mary.calc());

```

**[⮬ back to top](#categories)**

### Readings:
A list of interesting links about this same topic.

- https://www.google.com/amp/s/javascriptweblog.wordpress.com/2010/07/26/no-more-ifs-alternatives-to-statement-branching-in-javascript/amp/
- http://adripofjavascript.com/blog/drips/using-duck-typing-to-avoid-conditionals-in-javascript.html
- https://hackernoon.com/rethinking-javascript-the-if-statement-b158a61cd6cb
- https://stackoverflow.com/questions/57023787/descending-order-with-if-else-and-not-use-logical-operators-javascript
- https://medium.com/front-end-weekly/javascript-path-to-eliminating-if-else-dab7a1912024
- https://medium.com/edge-coders/coding-tip-try-to-code-without-if-statements-d06799eed231
