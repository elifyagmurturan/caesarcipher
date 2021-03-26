alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

str_in = input("Enter message, for example HELLO:")
shift = int(input("Shift value, for example 2: "))

n = len(str_in)
str_out = ""

for i in range(n):
	c = str_in[i]
	loc = alpha.find(c)
	newloc = loc + shift
	str_out += alpha[newloc]

print("Obfuscated version: ", str_out)
