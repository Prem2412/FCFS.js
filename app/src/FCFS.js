function firstComeFirstServed(){
    let clock=0;
    let completed=0, currentProcesses, currentProcess;

    // for(let i=0;i<numberOfProcesses.value;i++){
        
    //     if(i==0){
    //         p[i].startAt=p[i].arrivalTime;
    //         p[i].finishAt=p[i].arrivalTime+p[i].burstTime;
    //         p[i].completed=true;
    //         clock=p[i].finishAt;
    //     } else {
    //         if(clock<p[i].arrivalTime){
    //             p[i].startAt=p[i].arrivalTime;
    //             p[i].finishAt=p[i].arrivalTime+p[i].burstTime;
    //             p[i].completed=true;
    //             clock=p[i].finishAt;
    //         } else {
    //             p[i].startAt=clock;
    //             p[i].finishAt=clock+p[i].burstTime;
    //             p[i].completed=true;
    //             clock=p[i].finishAt;
    //         }
    //     }
    // }
//--

for(let i=0;i<p.length;i++){
    p[i].completed=false;
}

    p[0].startAt=p[0].arrivalTime;
    p[0].finishAt=p[0].arrivalTime+p[0].burstTime;
    p[0].completed=true;
    clock=p[0].finishAt;
    completed++;

    while(1){
        if(completed>=p.length){break;}
        currentProcesses=p.filter((pr)=>{
            return pr.arrivalTime<=clock && pr.completed===false;
        });
        //console.log('currentProcesses from FCFS',currentProcesses);
        if(currentProcesses.length===0) {clock++; continue;}

        currentProcess=currentProcesses[0];
        for(let i=0;i<currentProcesses.length;i++){
            if (currentProcesses[i].arrivalTime<currentProcess.arrivalTime){
                currentProcess=currentProcesses[i];
            }
        }
        for(let i=0;i<currentProcesses.length;i++){
            if (currentProcesses[i].arrivalTime===currentProcess.arrivalTime&&currentProcesses[i].burstTime<currentProcess.burstTime){
                currentProcess=currentProcesses[i];
            }
        }
        //console.log('currentProcess from FCFS',currentProcess);
        currentProcess.startAt=clock;
        currentProcess.finishAt=clock+currentProcess.burstTime;
        currentProcess.completed=true;
        completed++;
        clock=currentProcess.finishAt;

        for(let i=0;i<p.length;i++){
            if (p[i].name===currentProcess.name){
                p[i]=currentProcess;
            }
        }
    }

    finalize(p);
};
