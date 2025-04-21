# Función para mostrar un spinner mientras se cargan los datos
show_spinner() {
    local delay=0.1
    local spinstr='|/-\'
    while [ true ]; do
        local temp=${spinstr#?}
        printf " [%c]  Cargando datos de inicio de NodoNexus..." "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\r"
    done
}

# Iniciar el spinner en segundo plano
show_spinner &

# Guardar el PID del spinner para luego matarlo
spinner_pid=$!

# Simular carga (reemplazar esto con tus comprobaciones reales)
sleep 5  # Esto simula el tiempo de espera, reemplázalo con tus propias comprobaciones

# Matar el spinner cuando hayamos terminado
kill $spinner_pid
wait $spinner_pid 2>/dev/null
printf "\r%-60s\n" "Datos cargados correctamente"

# Mostrar el mensaje principal
echo -e "\n\033[1;36m=====================================================================\033[0m"
echo -e "\033[1;34m                    [ PROYECTO NODONEXUS INICIADO ]\033[0m"
echo -e "\033[1;36m=====================================================================\033[0m"
echo -e "\033[1;32m  SERVICIOS DISPONIBLES:\033[0m"
echo -e "\033[1;33m  - Frontend:\033[0m    http://localhost"
echo -e "\033[1;33m  - Backend:\033[0m     http://localhost:9091/api"
echo -e "\033[1;33m  - RabbitMQ:\033[0m    http://localhost:15673 (Usuario: guest/guest)"
echo -e "\033[1;33m  - PostgreSQL:\033[0m  postgresql -> conexion establecida"
echo -e "\033[1;36m=====================================================================\033[0m"
echo -e "\033[1;35m  NOTA: Los servicios pueden tardar unos segundos en estar disponibles\033[0m"
echo -e "\033[1;36m=====================================================================\033[0m\n"