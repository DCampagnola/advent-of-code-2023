
# ask for the day number
echo "Enter the day number:"
read day

# create the folder
mkdir -p day-$day

# create the solution files
touch day-$day/solution.js
touch day-$day/solution.test.js
touch day-$day/run-input.js