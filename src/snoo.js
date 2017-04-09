const thing = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MjkuNzA5IDQyOS43MDkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQyOS43MDkgNDI5LjcwOTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6IzE4MUExQzsiIGQ9Ik00MjkuNzA5LDE5Ni42MThjMC0yOS44MDMtMjQuMTYtNTMuOTYyLTUzLjk2My01My45NjJjLTE0LjkyNiwwLTI4LjQxLDYuMDg1LTM4LjE3NiwxNS44ODEgICBjLTMwLjE3Ny0xOS40NjMtNjguNzMtMzEuODY2LTExMS4wNzItMzMuODAxYzAuMDI2LTE3Ljk3OCw4LjA3OC0zNC43MzcsMjIuMTA0LTQ1Ljk4OWMxNC4wNTEtMTEuMjcxLDMyLjE5OC0xNS40OTIsNDkuNzc1LTExLjU4OCAgIGwyLjQxNCwwLjUzNmMtMC4wMjQsMC42MDUtMC4wOTEsMS4xOTgtMC4wOTEsMS44MDljMCwyNC44NzgsMjAuMTY4LDQ1LjA0Niw0NS4wNDYsNDUuMDQ2czQ1LjA0Ni0yMC4xNjgsNDUuMDQ2LTQ1LjA0NiAgIGMwLTI0Ljg3OS0yMC4xNjgtNDUuMDQ2LTQ1LjA0Ni00NS4wNDZjLTE1Ljk5NywwLTMwLjAxLDguMzYyLTM4LjAwMiwyMC45MjlsLTQuMzE3LTAuOTU5Yy0yNC41MS01LjQ0Ni00OS44MDcsMC40NDItNjkuMzk1LDE2LjE1NiAgIGMtMTkuNTY0LDE1LjY5NS0zMC43OTIsMzkuMDc0LTMwLjgxOCw2NC4xNTJjLTQyLjMzMiwxLjkzNC04MC44NzgsMTQuMzMxLTExMS4wNTIsMzMuNzg1Yy05Ljc2Ny05Ljc5OC0yMy4yNzEtMTUuODY2LTM4LjItMTUuODY2ICAgQzI0LjE2LDE0Mi42NTYsMCwxNjYuODE1LDAsMTk2LjYxOGMwLDIwLjc2NSwxMS43NSwzOC43NTUsMjguOTQ2LDQ3Ljc3NmMtMS4zMDYsNi42OC0xLjk5MywxMy41MS0xLjk5MywyMC40NjIgICBjMCw3Ny41MzgsODQuMTI2LDE0MC4zOTUsMTg3LjkwMSwxNDAuMzk1czE4Ny45MDEtNjIuODU3LDE4Ny45MDEtMTQwLjM5NWMwLTYuOTQ4LTAuNjg3LTEzLjc3NS0xLjk5MS0yMC40NTIgICBDNDE3Ljk2MSwyMzUuMzgxLDQyOS43MDksMjE3LjM4NSw0MjkuNzA5LDE5Ni42MTh6IE0zNDUuNzQ2LDQ3Ljc0M2MxMiwwLDIxLjc2Miw5Ljc2MiwyMS43NjIsMjEuNzYyICAgYzAsMTEuOTk5LTkuNzYyLDIxLjc2MS0yMS43NjIsMjEuNzYxcy0yMS43NjItOS43NjItMjEuNzYyLTIxLjc2MUMzMjMuOTg0LDU3LjUwNSwzMzMuNzQ3LDQ3Ljc0MywzNDUuNzQ2LDQ3Ljc0M3ogTTIzLjI4NCwxOTYuNjE4ICAgYzAtMTYuOTE2LDEzLjc2Mi0zMC42NzgsMzAuNjc4LTMwLjY3OGM3LjI0NSwwLDEzLjg5NSwyLjUzOCwxOS4xNDIsNi43NThjLTE2LjQxMiwxNC4wOC0yOS4xMTgsMzAuNjMxLTM3LjAwNyw0OC44MDQgICBDMjguMzQ5LDIxNS45MzcsMjMuMjg0LDIwNi44NjgsMjMuMjg0LDE5Ni42MTh6IE0zMzMuNzg0LDM0NS40NzdjLTMxLjQ5MiwyMy41My03My43MjksMzYuNDg5LTExOC45MjksMzYuNDg5ICAgcy04Ny40MzctMTIuOTU5LTExOC45MjktMzYuNDg5Yy0yOS40NjItMjIuMDEzLTQ1LjY4OC01MC42NDUtNDUuNjg4LTgwLjYyMWMwLTI5Ljk3NywxNi4yMjYtNTguNjA5LDQ1LjY4OC04MC42MjIgICBjMzEuNDkyLTIzLjUzLDczLjcyOS0zNi40ODksMTE4LjkyOS0zNi40ODlzODcuNDM3LDEyLjk1OSwxMTguOTI5LDM2LjQ4OWMyOS40NjIsMjIuMDEzLDQ1LjY4OCw1MC42NDUsNDUuNjg4LDgwLjYyMiAgIEMzNzkuNDcxLDI5NC44MzIsMzYzLjI0NiwzMjMuNDY0LDMzMy43ODQsMzQ1LjQ3N3ogTTM5My42MDUsMjIxLjQ4OGMtNy44OTEtMTguMTctMjAuNTk2LTM0LjcxNi0zNy4wMDUtNDguNzk0ICAgYzUuMjQ3LTQuMjIsMTEuOTAxLTYuNzU0LDE5LjE0Ny02Ljc1NGMxNi45MTYsMCwzMC42NzgsMTMuNzYyLDMwLjY3OCwzMC42NzhDNDA2LjQyNCwyMDYuODY3LDQwMS4zNTMsMjE1LjkyNSwzOTMuNjA1LDIyMS40ODh6Ii8+Cgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiNEODAwMDA7IiBjeD0iMTQ2LjIyNCIgY3k9IjIzMi4wNzQiIHI9IjI0LjU3Ii8+Cgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiNEODAwMDA7IiBjeD0iMjgzLjQ4NCIgY3k9IjIzMi4wNzQiIHI9IjI0LjU3Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMTgxQTFDOyIgZD0iTTI3My4wNzksMjkxLjc3M2MtMTcuMzIsMTUuNzgtMzkuNzczLDI0LjQ3LTYzLjIyNCwyNC40N2MtMjYuMzMyLDAtNTAuNzI5LTEwLjYxMi02OC42OTYtMjkuODgxICAgYy00LjM4NC00LjcwNC0xMS43NTEtNC45Ni0xNi40NTQtMC41NzVjLTQuNzAzLDQuMzg0LTQuOTYsMTEuNzUyLTAuNTc1LDE2LjQ1NGMyMi4wOTUsMjMuNjk1LDUzLjM0MSwzNy4yODUsODUuNzI2LDM3LjI4NSAgIGMyOS4yNjYsMCw1Ny4yODgtMTAuODQ3LDc4LjkwNS0zMC41NDNjNC43NTItNC4zMyw1LjA5Ni0xMS42OTQsMC43NjUtMTYuNDQ2QzI4NS4xOTcsMjg3Ljc4OCwyNzcuODM4LDI4Ny40NCwyNzMuMDc5LDI5MS43NzN6Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="

export default thing;