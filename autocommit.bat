echo > .gitignore
git add --all
git commit -m "autocommit %date:~-4%%date:~3,2%%date:~0,2%.%time:~0,2%%time:~3,2%%time:~6,2%"
git push origin master
exit 
