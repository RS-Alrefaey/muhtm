# muhtm

1- pull the project  <br>
2- use pip freeze to install the required libraries  <br>
3- git status to check    <br>
4- create a new branch and dev  <br>
5- push to the branch  <br>
6- make a merge request to the main branch  <br>


## During the project
- always pull before work, to be updated with the last version <br>
- start a new branch to make your changes <br>
- always use git status <br>
- after testing what you change and it is working properly, do git add (only add the files you want to commit and push) <br>
- after adding, you commit with those changes with a standard naming of titles <br>
- git commit -m “ brief description of this commit” <br>
- push, prefer with the full syntax to avoid any undesired pushes <br>
- push &lt;to&gt; &lt;local branch name&gt;:&lt;remote branch name to push in it&gt;<br>

## How to Create a New Branch and Push It to GitHub

Follow these steps to create a new branch in your local repository and push it to the remote repository on GitHub.

```sh
# Step 1: Navigate to Your Local Repository
cd /path/to/your/local/repo

# Step 2: Update Your Local Repository (Optional but Recommended)
git fetch origin
git pull origin main  # Replace 'main' with the name of your default branch if it's not 'main'

# Step 3: Create a New Branch
git checkout -b new-branch-name  # Replace 'new-branch-name' with the desired branch name

# Step 4: Make Changes (Add Streamlit App, etc.)
# At this point, you can add your Streamlit app or make other changes to the new branch.
# Ensure all changes work as expected locally.

# Step 5: Stage and Commit Changes
git add .
git commit -m "Your commit message"  # Replace with an appropriate commit message

# Step 6: Push the New Branch to Remote
git push -u origin new-branch-name  # Replace 'new-branch-name' with the name of your new branch
```

### Step 7: Create a Pull Request (Optional)
Once you have pushed your branch to GitHub, you can create a pull request through the GitHub website:
- Navigate to your repository on GitHub.
- Click on the "Pull requests" tab.
- Click on the "New pull request" button.
- Choose `main` as the base branch and `new-branch-name` as the compare branch.
- Review your changes and click "Create pull request".
- Fill in the pull request description and create it.

### Final Notes
Every change should be well-tested locally before committing it to any branch to avoid introducing bugs or breaking changes. Creating a new branch is good practice when introducing new features or making substantial modifications, as it does not affect the main working branch of your project.
