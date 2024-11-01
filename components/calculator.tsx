'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calculator, Delete, Divide, Equal, Minus, Plus, X } from 'lucide-react';

export function CalculatorComponent() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setShouldResetDisplay(true);
    setEquation(display + ' ' + op + ' ');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  const handleDelete = () => {
    setDisplay(display.length === 1 ? '0' : display.slice(0, -1));
  };

  return (
    <Card className="w-[300px] shadow-lg border-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl tracking-tight">Calculator</span>
          <Calculator className="h-5 w-5 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground h-5 font-mono">
            {equation}
          </div>
          <Input
            className="text-right text-2xl h-12 font-mono tracking-wider"
            value={display}
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          <Button
            variant="outline"
            className="text-destructive hover:text-destructive-foreground font-medium"
            onClick={handleClear}
          >
            C
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
          >
            <Delete className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperator('/')}
          >
            <Divide className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperator('*')}
          >
            <X className="h-4 w-4" />
          </Button>

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="font-medium text-lg"
              onClick={() => handleNumber(String(num))}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => handleOperator('-')}
          >
            <Minus className="h-4 w-4" />
          </Button>

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="font-medium text-lg"
              onClick={() => handleNumber(String(num))}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => handleOperator('+')}
          >
            <Plus className="h-4 w-4" />
          </Button>

          <div className="grid grid-cols-3 col-span-4 gap-1.5">
            <div className="grid grid-cols-3 col-span-2 gap-1.5">
              {[1, 2, 3].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  className="font-medium text-lg"
                  onClick={() => handleNumber(String(num))}
                >
                  {num}
                </Button>
              ))}
              <Button
                variant="outline"
                className="col-span-2 font-medium text-lg"
                onClick={() => handleNumber('0')}
              >
                0
              </Button>
              <Button
                variant="outline"
                className="font-medium text-lg"
                onClick={() => handleNumber('.')}
              >
                .
              </Button>
            </div>
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 row-span-2 h-full"
              onClick={handleEqual}
            >
              <Equal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}