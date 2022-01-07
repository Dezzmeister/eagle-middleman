:: This script should be used to start the proxy server on a remote Windows server. Linux
:: is preferred, but cannot be used to connect to Eagle VPN remotely due to BC's stupid VPN settings.
:: Connecting to a remote Windows server will disconnect the server from the VPN, and connecting to the VPN
:: will disconnect a remote session, so this script will connect to the VPN and start the proxy server after
:: the remote session ends.
"C:\Program Files (x86)\Cisco\Cisco AnyConnect Secure Mobility Client\vpncli.exe" connect eaglevpn.bc.edu
yarn start
pause