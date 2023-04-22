# How to allow connection to WSL apps

- forward the port between WSL <-> Windows
`netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=172.22.239.182`

- github 4150 issue

