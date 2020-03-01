# Avoiding use "IF" in our JS code.
Well, I write this article because lately I was dealing with source code in js that had an excessive amount of if statement,
at levels that I had never seen. That is why I think it is very important to share these simple techniques that will help us to write code without having to think about the "if" when deciding.

I am going to explain 6 ways on how to do this.

## Categories:
- Ternary operator
- Short circuit
- Function delegation
- Non-branching strategie
- Functions as Data
- Polymorfism


### 1) Ternary operator:
We are talking about this "condition ? expr1 : expr2", very easy.

**Code with IF**:
```javascript
	function saveCustomer(customer) {
	  if (isCustomerValid(customer)) {
	    database.save(customer)
	  } else {
	    alert('customer is invalid')
	  }
	}
```

**Refactored code**:
```javascript
	function saveCustomer(customer) {
	  return isCustomerValid(customer)
	    ? database.save(customer)
	    : alert('customer is invalid')
	}
```
