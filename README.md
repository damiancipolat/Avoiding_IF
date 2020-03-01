Well, I write this article because lately I was dealing with source code in js that had an excessive amount of if statement,
at levels that I had never seen. That is why I think it is very important to share these simple techniques that will help us to write code without having to think about the "if" when deciding.

I am going to explain 6 ways on how to do this.

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
fgfdgdfsgssdfgdfgdfgdsfgdfgdfgdfgdfgsdfgdfgsdfgsdf

#### Example 1:

- **Code with IF**:
```javascript

```

- **Refactored code**:
```javascript

Here is a simple calculator. With ifs….

var calc = {
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

var calc = {
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
