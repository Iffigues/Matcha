unsigned int change(int *b, unsigned int size) {
	int v = b[size--];
	unsigned int  dec = 0;
	int beg = 0;
	int g = size;
	int a;

	while (beg < size && size > 0) {
		if (b[beg] == v && b[g] != v) {
			a = b[g];
			b[g] = b[beg];
			b[beg] = a;
			g--;
			dec++;
		}
		beg++;
	}
	return dec;
}

void ft_block(int *b, unsigned int size) {
	size--;
	if (size > 0) {
		size = size - change(b, size);
		ft_block(b, size);
		for (int ii = 0; ii < 11; ii++) {
					printf("%d\n",b[ii]);
						}
		printf("------------------\n");
	}
}

int main() {
	int i[] = {1,2,3,4,2,4,5,1,5,6,4};
	ft_block(i,11);	
	for (int ii = 0; ii < 11; ii++) {
		printf("%d\n",i[ii]);
	}
}
