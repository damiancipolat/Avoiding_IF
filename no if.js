
Ternary operator:
-----------------

	condition ? expr1 : expr2

	// typical code you might stumble upon
	function saveCustomer(customer) {
	  if (isCustomerValid(customer)) {
	    database.save(customer)
	  } else {
	    alert('customer is invalid')
	  }
	}

	// ternary equivalent
	function saveCustomer(customer) {
	  return isCustomerValid(customer)
	    ? database.save(customer)
	    : alert('customer is invalid')
	}

	// ES6 style
	const saveCustomer = customer =>
	  isCustomerValid(customer)
	    ? database.save(customer)
	    : alert('customer is invalid')

	// old school else-if
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

	// ES6 style custom formatted ternary magic
	const customerValidation = customer =>
	  !customer.email   ? error('email is required')
	  : !customer.login ? error('login is required')
	  : !customer.name  ? error('name is required')
	                    : customer

	//Example 1
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


	//Example 2
	function getEventTarget(evt) {
    evt = evt || window.event;
    return evt && (evt.target || evt.srcElement);
	}


Short circuit:
--------------

	//invoke callback if there is one
	callback && callback();

	//delay by argument or 20
	delayBy(delay || 20);

	//remove node from its parent
	node && node.parent && node.parent.removeChild(node);

	//log a test in the console id we have one
	window.console && console.log('test');


Function delegation:
--------------------

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

Non-branching strategies:
-------------------------

//Dont use switch

const dogSwitch = (breed) =>({
  "border": "Border Collies are good boys and girls.",
  "pitbull": "Pit Bulls are good boys and girls.",
  "german": "German Shepherds are good boys and girls.",  
})[breed]||'Im the default';


dogSwitch("border xxx")


Functions as Data:
------------------

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


