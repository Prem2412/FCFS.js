function priority(){
    let clock=p[0].arrivalTime;
    let completed=0;
    let currentProcesses,currentProcess;
    let pInOrder=[];
    while(1){
        if (completed>=numberOfProcesses.value){
            break;
        }

        currentProcesses=p.filter((pr)=>{
            return (pr.arrivalTime<=clock && !pr.completed);
        });
        if (currentProcesses.length>0) {
            currentProcess=currentProcesses[0];
            for(let i=0;i<currentProcesses.length;i++){
                if(currentProcesses[i].priority<currentProcess.priority) {
                    currentProcess=currentProcesses[i];
                }
            }
        } else {
            clock++;
            continue;
        }

        //console.log('currentProcesses', currentProcesses);
        //console.log('currentProcess', currentProcess);
        
        currentProcess.startAt=clock;
        currentProcess.finishAt=clock+currentProcess.burstTime;
        currentProcess.completed=true;
        clock=clock+currentProcess.burstTime;
        completed++;
    }

    finalize(p);
}
