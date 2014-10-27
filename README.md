# A Toy Lisp Interpreter in Javascript

A toy lisp interpreter that I wrote while learning Clojure, it's heavily influenced by Clojure
but not fully Clojure compatible.. yet.

It uses [mori's data structures](https://github.com/swannodette/mori) under the hood.


It is also heavily influenced by Peter Norvig's [How to Write a Lisp Interpreter in Python](http://norvig.com/lispy.html)


To run

```shell
node main.js
8===D~~  (do (def fact (fn [n] (if (<= n 1) 1 (* n (fact (- n 1)))))) (fact 100))
9.33262154439441e+157

````


Copyright (C) 2014 Joe Attueyi

