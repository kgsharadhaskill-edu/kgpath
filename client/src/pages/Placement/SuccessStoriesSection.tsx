import React from 'react';
import { Card, CardContent } from './ui/Card'; // Assuming path is correct
import { Badge } from './ui/Badge';           // Assuming path is correct
import { successStories } from './placementData'; // Assuming path is correct

const SuccessStoriesSection = React.memo(() => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            Real students, real transformations, real success.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, idx) => (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {/* --- OPTIMIZATIONS APPLIED HERE --- */}
                  <img 
                    src={story.image} 
                    alt={story.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                    // 1. Defer loading of images that are off-screen
                    loading="lazy" 
                    // 2. Prevent layout shift by specifying image dimensions
                    width="64"
                    height="64"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{story.name}</h3>
                    <Badge variant="secondary" className="text-xs">{story.company}</Badge>
                  </div>
                </div>
                <div className="space-y-2 mb-4 pb-4 border-b">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Before:</span>
                    <span className="font-medium">{story.previousRole}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">After:</span>
                    <span className="font-medium text-primary">{story.currentRole}</span>
                  </div>
                   <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Package:</span>
                    <span className="font-bold text-green-600">{story.package}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">"{story.story}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

export default SuccessStoriesSection;