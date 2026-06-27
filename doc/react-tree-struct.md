
1 a     a - remove
2 V     V <- next   v - keep            v - keep
3 f     f           f <- next           f - remove          v - keep
4 g     g           g                   f - g <- next       f - g - remove      v - keep
5 g     g           g                   g                   g <- next           g <- remove             v - keep
6 b     a - b       a - b               a - b               a - b               a - b <- next (b)       a - b <- remove         v - keep                v       
7 e     e           e                   e - f               e - f - g           e - f - g               e - f - g <- next e     e - f - g - keep        e - f - g
8 c     c           c                   c                   c                         - g                     - g                     - g                     - g
                                                                                c                       a - b - c               a - b - c <- last c     a - b - c

Rules next N (node)

next N no child no parent <- keep

next N has link parent or child <- remove N <- link N to child or parent M

next N has parent or child but links again <- remove N <- link N to child or parent M

next N has parent or child but no links <- keep 

last N dont need check - keep 


--- faster

pick all roots

1 a     a - b - c               = a - b - c
2 V     v                       = v
3 f         f
4 g             g
5 g                 g
6 b                     b
7 e     e - f - g x g           = e - f - g
8 c                         c           - g

pick all roots no parent

a - b - c - a

1 a   a remove
2 b         b  remove
3 a - b         a - b remove
4 c - a - b         c - a - b remove
5 c - a - b             c - a - b remove
6 a - b - c - a - b - c - a - b     a - b - c - a - b - c - a - b keep - c - a - b - c - a - b - c - a - b
7 b - c - a - b - c - a - b             b - c - a - b - c - a - b keep - c - a - b - c - a - b - c - a - b
8 b - c - a - b - c - a - b                  b - c - a - b - c - a - b keep - c - a - b - c - a - b - c - a - b
9 a - b - c - a - b - c - a - b                 a - b - c - a - b - c - a - b keep - c - a - b - c - a - b - c - a - b
10c - a - b - c - a - b - c - a - b                 c - a - b - c - a - b - c - a - b - remove

keep if not parent

remove if has parent

remove dublicated, keep longest

1. a - b - c - a - b - c - a - b - c - a - b - c - a - b - c - a - b remove exist 3
2. b - c - a - b - c - a - b - c - a - b - c - a - b - c - a - b   remove exist 3
3. a - b - c - a - b - c - a - b - c - a - b - c - a - b - c - a - b keep

----
1 a a keep - b - c
2 V     v keep
3 f         f - remove
4 g             g - remove
5 g                 g - remove
6 b                     b remove
7 e - f - g                 e - f - g keep
        - g                       - g
8 c                             c remove

a - b - c
v 
e - f - g
      - g