call pushd e:
call cd "lesterlecong.github.io"

echo > .gitignore
git add --all
git commit -m "autocommit %date:~-4%%date:~3,2%%date:~0,2%.%time:~0,2%%time:~3,2%%time:~6,2%"
git push https://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@github.com/lesterlecong/lesterlecong.github.io.git
