@ECHO OFF
Title Auto Commiting Changes
git add .
git commit -m %1
git push origin master