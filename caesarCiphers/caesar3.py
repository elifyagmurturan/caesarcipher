alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

str_in = input("Enter message, for example HELLO: ")
shift = int(input("Enter shift value, like 4: "))

n = len(str_in)
str_out = ""

for i in range(n):
	c = str_in[i]
	loc = alpha.find(c)
	newloc = loc + shift
	if newloc >=26:
		newloc -= 26
	str_out += alpha[newloc]

print("Confuscated version", str_out)
