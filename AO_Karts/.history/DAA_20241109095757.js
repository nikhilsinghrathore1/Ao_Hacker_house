def reverse_stack(stack):
    if len(stack) == 0:
        return
    # Pop the top element
    top = stack.pop()
    # Reverse the remaining stack
    reverse_stack(stack)
    # Push the popped element back to the stack
    insert_at_bottom(stack, top)

def insert_at_bottom(stack, element):
    if len(stack) == 0:
        stack.append(element)
        return
    # Pop the top element
    top = stack.pop()
    # Recursively call to insert the element at the bottom
    insert_at_bottom(stack, element)
    # Push the popped element back to the stack
    stack.append(top)

# Example usage
stack = [1, 2, 3, 4, 5]
reverse_stack(stack)
print(stack)  # Output: [5, 4, 3, 2, 1]
