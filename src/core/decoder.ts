import { AnyTable } from 'drizzle-orm';
import { executefunction } from './executeFunction';

type filterNode = {
	functionName: string;
	args: any[];
};

const decode = (table: AnyTable<any>, filterText: string) => {
	const filter = filterText.trim();

	const stack: filterNode[] = [];

	const parse = () => {
		let text = '';
		for (let i = 0; i < filter.length; i++) {
			if (filter[i] === '(') {
				stack.push({
					args: [],
					functionName: text,
				});
				text = '';
			}
			if (filter[i] === ',') {
				if (text !== '') {
					stack[stack.length - 1].args.push(text);
					text = '';
				}
			}

			if (filter[i] === ')') {
				if (text !== '') {
					stack[stack.length - 1].args.push(text);
					text = '';
					// Since ( means an end of a method execute that method and append it to the parent args
					if (stack.length > 1) {
						const node = stack.pop();
						if (node !== undefined) {
							stack[stack.length - 1].args.push(
								executefunction(table, node.functionName, node.args)
							);
						}
					}
					console.log(i);
					console.log(stack);
				}
			}
			if (
				filter[i] !== undefined &&
				filter[i] !== '(' &&
				filter[i] !== ',' &&
				filter[i] !== ')'
			) {
				text += filter[i];
			}
		}
		const node = stack.pop();
		//console.log(args);
		if (node !== undefined) {
			return executefunction(table, node.functionName, node.args);
		}
		return null;
	};
	return parse();
};

export const generateDrizzleFilter = (
	table: AnyTable<any>,
	filterText: string
) => {
	return decode(table, filterText);
};
