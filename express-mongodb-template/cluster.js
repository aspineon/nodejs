import cluster from 'cluster';
import os from 'os';

if (cluster.isMaster) {
    os.cpus().forEach(() => cluster.fork());
    cluster.on('listening', worker => {
        console.log('Cluster %d connected', worker.process.pid);
    });
    cluster.on('disconnect', worker => {
        console.log('Cluster %d disconnected', worker.process.pid);
    });
    cluster.on('exit', worker => {
        console.log('Cluster %d is down', worker.process.pid);
        cluster.fork();
    })
} else {
    require('./service.js')
}